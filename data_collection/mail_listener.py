import imaplib
import email

mail = imaplib.IMAP4_SSL('imap.gmail.com')
password = open("password.log").read()
mail.login(open("username.log").read(), password)


mail.select('inbox')


result, data = mail.search(None,'ALL')
result, data = mail.uid('search', None, "ALL")


latest_email_uids = data[0].split()

for uid in reversed(latest_email_uids):
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
		                print part.get_payload()
		                input()

			print("\n\n")
			break
	except: pass