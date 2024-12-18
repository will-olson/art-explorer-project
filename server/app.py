from flask import Flask, request, jsonify
from config import app, db, api
from flask_migrate import Migrate
from flask_cors import CORS
from models import Artist, Artwork, Era, Discipline

CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
db.init_app(app)
api.init_app(app)

migrate = Migrate(app, db)

@app.route('/debug-db', methods=['GET'])
def debug_db():
    try:
        with db.engine.connect() as conn:
            return jsonify({"message": "Database connection successful"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/debug-disciplines', methods=['GET'])
def debug_disciplines():
    try:
        disciplines = Discipline.query.all()
        return jsonify([discipline.to_dict() for discipline in disciplines]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

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
    return jsonify([discipline.to_dict() for discipline in disciplines])

@app.route('/disciplines/<int:id>', methods=['GET'])
def get_discipline(id):
    discipline = Discipline.query.get_or_404(id)
    return jsonify(discipline.to_dict())

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
    return jsonify([artwork.to_dict() for artwork in artworks])

@app.route('/artworks/<int:id>', methods=['GET'])
def get_artwork(id):
    artwork = Artwork.query.get_or_404(id)
    return jsonify(artwork.to_dict())

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
    return jsonify([artist.to_dict() for artist in artists])

@app.route('/artists/<int:id>', methods=['GET'])
def get_artist(id):
    artist = Artist.query.get_or_404(id)
    return jsonify(artist.to_dict())

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
    return jsonify([era.to_dict() for era in eras])

@app.route('/eras/<int:id>', methods=['GET'])
def get_era(id):
    era = Era.query.get_or_404(id)
    return jsonify(era.to_dict())

if __name__ == '__main__':
    app.run(port=5555, debug=True)