import imaplib
import email
import re
import sqlite3


# DOES NOT HANDLE VOIDED ITEMS FOR PUBLIX

def parsePublix(content):

	# input()
	content = re.findall(r"\d{3}-\d{3}-\d{4}(.*)Order Total", content, flags=re.I | re.M | re.S)[0]
	# print(content)
	# input()
	content = re.sub(r"\n\s+\d+\s+@\s+\d+\s+FOR\s+\d+\.\d{2}", "", content, flags=re.I)
	# print(content)
	# print("after first parse")
	# input()
	content = re.sub(r"\n\s+you saved.+", "", content, flags=re.I)
	content = re.sub(r"\n\s+promotion.+", "", content, flags=re.I)
	content = re.sub(r"\r", " ", content, flags=re.I)

	# print(content)
	items = [item.strip().upper() for item in re.findall(r"(.*)\s+\d+\.\d{2}", content)]
	print(items)

	return items



def startListening():
	mail = imaplib.IMAP4_SSL('imap.gmail.com')
	password = open("password.log").read()
	mail.login(open("username.log").read(), password)


	mail.select('inbox')


	result, data = mail.search(None,'ALL')
	result, data = mail.uid('search', None, "ALL")


	latest_email_uids = data[0].split()


	total_items = []


	for uid in list(latest_email_uids)[:100]:
		result, data = mail.uid('fetch', uid, '(RFC822)')
		raw_email = data[0][1]
		# print(str(raw_email))
		email_message = email.message_from_bytes(raw_email)

		connection = sqlite3.connect('pvi.db')
		c = connection.cursor()

		try:
			
			if "Your Publix receipt." in email_message['Subject']:
				# print(email_message["To"])
				# print(email_message['From'])
				print(email_message['Subject'])
				maintype = email_message.get_content_maintype()

				senderEmail = re.search(r'\<(.*)\>', email_message['From']).group(0)[1:-1]
				print(senderEmail, "test")
				# check if there is a correlated user

				
				ret = [email for email in c.execute('SELECT * FROM user WHERE email=?', (senderEmail,))]
				if not ret:
					mail.uid('STORE', uid , '+FLAGS', '(\Deleted)')  
					mail.expunge() 
					continue				

				if maintype == 'multipart':
					for part in email_message.get_payload():
						if part.get_content_maintype() == 'text':
							content = part.get_payload()
							
							
							items = parsePublix(content)

							break

				# DELETE READ EMAIL AFTER READ
				
				mail.uid('STORE', uid , '+FLAGS', '(\Deleted)')  
				mail.expunge() 
				
				# ADD ITEMS TO DATABASE
				#Can't always execute many. Select to see if already in inventory. If already in inventory, update with amount rather than insert
				""" c.executemany('INSERT INTO inventory VALUES (?,?,?,?,?)', items) #total_items is a list of tuples of (owner, foodName, amount, unit, store)
				connection.commit()"""
				
				# break
		except: pass

	# print(total_items)



if __name__ == '__main__':
	startListening()