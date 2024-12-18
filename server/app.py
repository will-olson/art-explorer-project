from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from models import Artist, Artwork, Era, Discipline
from config import app, db, api

api.init_app(app)
CORS(app)

db.init_app(app)

migrate = Migrate(app, db)

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

@app.route('/disciplines', methods=['POST'])
def create_discipline():
    data = request.get_json()
    new_discipline = Discipline(name=data['name'])
    db.session.add(new_discipline)
    db.session.commit()
    return jsonify({'message': 'Discipline created'}), 201

@app.route('/disciplines', methods=['GET'])
def get_disciplines():
    disciplines = Discipline.query.all()
    return jsonify([discipline.name for discipline in disciplines])

@app.route('/disciplines/<int:id>', methods=['GET'])
def get_discipline(id):
    discipline = Discipline.query.get_or_404(id)
    return jsonify({'name': discipline.name})

@app.route('/artworks', methods=['POST'])
def create_artwork():
    data = request.get_json()
    new_artwork = Artwork(
        title=data['title'],
        description=data['description'],
        image_file=data['image_file'],
        artist_id=data['artist_id'],
        discipline_id=data['discipline_id']
    )
    db.session.add(new_artwork)
    db.session.commit()
    return jsonify({'message': 'Artwork created'}), 201

@app.route('/artworks', methods=['GET'])
def get_artworks():
    artworks = Artwork.query.all()
    return jsonify([artwork.title for artwork in artworks])

@app.route('/artworks/<int:id>', methods=['GET'])
def get_artwork(id):
    artwork = Artwork.query.get_or_404(id)
    return jsonify({
        'title': artwork.title,
        'description': artwork.description,
        'image_file': artwork.image_file
    })

@app.route('/artworks/<int:id>', methods=['DELETE'])
def delete_artwork(id):
    artwork = Artwork.query.get_or_404(id)
    db.session.delete(artwork)
    db.session.commit()
    return jsonify({'message': 'Artwork deleted'}), 200

@app.route('/artworks/<int:id>/like', methods=['PATCH'])
def like_artwork(id):
    artwork = Artwork.query.get_or_404(id)
    artwork.like_count += 1
    db.session.commit()
    return jsonify({'message': 'Artwork liked'}), 200

@app.route('/artworks/<int:id>/dislike', methods=['PATCH'])
def dislike_artwork(id):
    artwork = Artwork.query.get_or_404(id)
    artwork.dislike_count += 1
    db.session.commit()
    return jsonify({'message': 'Artwork disliked'}), 200

@app.route('/artists', methods=['POST'])
def create_artist():
    data = request.get_json()
    new_artist = Artist(name=data['name'], biography=data['biography'], era_id=data['era_id'])
    db.session.add(new_artist)
    db.session.commit()
    return jsonify({'message': 'Artist created'}), 201

@app.route('/artists', methods=['GET'])
def get_artists():
    artists = Artist.query.all()
    return jsonify([artist.name for artist in artists])

@app.route('/artists/<int:id>', methods=['GET'])
def get_artist(id):
    artist = Artist.query.get_or_404(id)
    return jsonify({'name': artist.name, 'biography': artist.biography})

@app.route('/eras', methods=['POST'])
def create_era():
    data = request.get_json()
    new_era = Era(name=data['name'], description=data['description'])
    db.session.add(new_era)
    db.session.commit()
    return jsonify({'message': 'Era created'}), 201

@app.route('/eras', methods=['GET'])
def get_eras():
    eras = Era.query.all()
    return jsonify([era.name for era in eras])

@app.route('/eras/<int:id>', methods=['GET'])
def get_era(id):
    era = Era.query.get_or_404(id)
    return jsonify({'name': era.name, 'description': era.description})

if __name__ == '__main__':
    app.run(port=5555, debug=True)