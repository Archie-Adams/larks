from app import db
from sqlalchemy.orm import validates, relationship
from datetime import datetime, date

class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(500), index=True, unique=True)
    password = db.Column(db.String(500))

    # Based on:
    # https://ed-a-nunes.medium.com/field-validation-for-backend-apis-with-python-flask-and-sqlalchemy-30e8cc0d260c
    @validates('email')
    def validate_email(self, key, email):
        # Check for empty email
        if not email:
            raise AssertionError('No email provided')
        # Check for already taken email
        if Users.query.filter(Users.email == email).first():
            raise AssertionError('Email is already in use')
        # Check for no '@' character
        if "@" not in email:
            raise AssertionError('Email address missing "@" symbol')
        # return email field and chain validate the password
        return email

    #relationship to PersonalDetails. uselist=False to ensure one-to-one.
    personal_details = relationship('personaldetails', back_populates='user', uselist=False)

    @validates('password')
    def validate_password(self, key, password):
        # Check for empty password
        if not password:
            raise AssertionError('No password provided')
        return password

class RootRadarMVPTest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(500))

class personaldetails(db.Model):
    __tablename__ = 'personaldetails'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    firstName = db.Column(db.String(500))
    lastName = db.Column(db.String(500))
    DOB = db.Column(db.Date)
    gender = db.Column(db.String(50))
    postCode = db.Column(db.String(100))
    city = db.Column(db.String(500))
    countryOfResidence = db.Column(db.String(500))
    highestEducation = db.Column(db.String(500))
    ethnicity = db.Column(db.String(500))
    nationality = db.Column(db.String(500))
    sexuality = db.Column(db.String(50))
    user = relationship('Users', back_populates='personal_details', uselist=False)

    @validates('DOB')
    def validate_DOB(self, key, DOB):
        if isinstance(DOB, date):
            birth_date = DOB
        else:
            birth_date = datetime.strptime(DOB, "%Y-%m-%d").date()
        
        today = date.today()
        age = today.year - birth_date.year - ((today.month, today.day) < (birth_date.month, birth_date.day))
        if age < 18:
            raise AssertionError('You must be older than 18 to use this service.')
        
        return birth_date

class Note(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    note = db.Column(db.String, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    prediction = db.Column(db.Integer)  # Add this line to store the prediction result

class AutismDetectorFeedback(db.Model):
    __tablename__ = 'AutismDetectorFeedback'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    totalScore = db.Column(db.Integer, nullable=False)
    user = relationship('Users', backref='feedback')
