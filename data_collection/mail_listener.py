import imaplib
import email
import re

mail = imaplib.IMAP4_SSL('imap.gmail.com')
password = open("password.log").read()
mail.login(open("username.log").read(), password)


mail.select('inbox')


result, data = mail.search(None,'ALL')
result, data = mail.uid('search', None, "ALL")


latest_email_uids = data[0].split()


total_items = []


for uid in list(reversed(latest_email_uids))[:100]:
	result, data = mail.uid('fetch', uid, '(RFC822)')
	raw_email = data[0][1]
	# print(str(raw_email))
	email_message = email.message_from_bytes(raw_email)


	


	try:
		
		if "Your Publix receipt." in email_message['Subject']:
			print(email_message["To"])
			print(email_message['From'])
			print(email_message['Subject'])
			maintype = email_message.get_content_maintype()

			if maintype == 'multipart':
				for part in email_message.get_payload():
					if part.get_content_maintype() == 'text':
						content = part.get_payload()
						
						# print(content)
						items = re.findall(r"\d{3}-\d{3}-\d{4}(.*)Order Total", content, flags=re.I | re.M | re.S)[0]
						items = [item.strip().upper() for item in re.findall(r"(.*)\s+\d+\.\d{2}", items)]

						total_items += items

						# print(items)
						# input()
						# break

			# print("\n\n")
			break
	except: pass

print(total_items)