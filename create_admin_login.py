from app import db, models

# this file exists to run a script that will add our admin login
admin = models.User_Login(username="admin", password="admin")
db.session.add(admin)
db.session.commit()