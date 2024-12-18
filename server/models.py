from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from config import db
from sqlalchemy_serializer import SerializerMixin

class Artist(db.Model, SerializerMixin):
    __tablename__ = 'artists'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)
    biography = db.Column(db.Text)
    era_id = db.Column(db.Integer, db.ForeignKey('eras.id'))

    era = db.relationship('Era', back_populates='artists')
    artworks = db.relationship('Artwork', back_populates='artist')

    serialize_rules = ('-artworks.artist', '-era.artists')

class Artwork(db.Model, SerializerMixin):
    __tablename__ = 'artworks'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.Text)
    image_file = db.Column(db.String)
    artist_id = db.Column(db.Integer, db.ForeignKey('artists.id'))
    discipline_id = db.Column(db.Integer, db.ForeignKey('disciplines.id'))

    artist = db.relationship('Artist', back_populates='artworks')
    discipline = db.relationship('Discipline', back_populates='artworks')

    serialize_rules = ('-artist.artworks', '-discipline.artworks')

class Era(db.Model, SerializerMixin):
    __tablename__ = 'eras'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)
    description = db.Column(db.Text)

    artists = db.relationship('Artist', back_populates='era')

    serialize_rules = ('-artists.era',)

class Discipline(db.Model, SerializerMixin):
    __tablename__ = 'disciplines'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), unique=True, nullable=False)

    artworks = db.relationship('Artwork', back_populates='discipline')

    serialize_rules = ('-artworks.discipline',)
