from app import app, db
from models import Artist, Artwork, Era, Discipline

with app.app_context():
    print("Starting seed...")

    db.session.query(Artwork).delete()
    db.session.query(Artist).delete()
    db.session.query(Era).delete()
    db.session.query(Discipline).delete()

    db.session.commit()

    disciplines = [
        Discipline(name="Painting"),
        Discipline(name="Sculpture"),
        Discipline(name="Photography"),
        Discipline(name="Digital Art")
    ]
    db.session.add_all(disciplines)

    eras = [
        Era(name="Renaissance", description="A period of great cultural change and achievement."),
        Era(name="Baroque", description="A style known for its drama, rich colors, and grandeur."),
        Era(name="Modernism", description="A movement that emerged in the late 19th century, emphasizing new techniques and perspectives."),
        Era(name="Impressionism", description="A movement focused on capturing the moment and light in painting."),
        Era(name="Contemporary", description="Art created in the present time, often challenging traditional norms.")
    ]
    db.session.add_all(eras)

    artists = [
        Artist(name="Leonardo da Vinci", biography="A famous Renaissance artist known for his works such as the Mona Lisa.", era_id=1),
        Artist(name="Michelangelo", biography="A Renaissance sculptor and painter, known for the Sistine Chapel ceiling.", era_id=1),
        Artist(name="Rembrandt", biography="A master of the Baroque period, famous for his self-portraits.", era_id=2),
        Artist(name="Caravaggio", biography="An Italian Baroque artist known for his use of light and shadow.", era_id=2),
        Artist(name="Pablo Picasso", biography="A leader in the Cubist movement and Modernist art.", era_id=3),
        Artist(name="Frida Kahlo", biography="A Mexican artist known for her deeply personal and symbolic works.", era_id=3),
        Artist(name="Claude Monet", biography="A key figure in the Impressionist movement, famous for his water lilies series.", era_id=4),
        Artist(name="Edgar Degas", biography="An Impressionist known for his works on movement, particularly dancers.", era_id=4),
        Artist(name="Banksy", biography="An anonymous street artist whose works challenge political and social norms.", era_id=5),
        Artist(name="Yayoi Kusama", biography="A Japanese artist known for her immersive installations and polka dot motifs.", era_id=5)
    ]
    db.session.add_all(artists)

    artworks = [
        Artwork(title="Mona Lisa", description="A portrait by Leonardo da Vinci, one of the most famous works in the world.", image_file="monalisa.jpg", artist_id=1, discipline_id=1),
        Artwork(title="David", description="A masterpiece of Renaissance sculpture by Michelangelo.", image_file="david.jpg", artist_id=2, discipline_id=2),
        Artwork(title="The Night Watch", description="A famous Baroque painting by Rembrandt.", image_file="nightwatch.jpg", artist_id=3, discipline_id=1),
        Artwork(title="Judith Beheading Holofernes", description="A Baroque painting by Caravaggio, known for its dramatic use of light.", image_file="judith.jpg", artist_id=4, discipline_id=1),
        Artwork(title="Guernica", description="A monumental painting by Pablo Picasso, depicting the horrors of war.", image_file="guernica.jpg", artist_id=5, discipline_id=1),
        Artwork(title="The Two Fridas", description="A double self-portrait by Frida Kahlo.", image_file="thetwofridas.jpg", artist_id=6, discipline_id=1),
        Artwork(title="Water Lilies", description="A series of Impressionist paintings by Claude Monet, capturing light and reflections.", image_file="waterlilies.jpg", artist_id=7, discipline_id=1),
        Artwork(title="Ballet Rehearsal", description="A painting by Edgar Degas, showing the movement and grace of dancers.", image_file="ballet.jpg", artist_id=8, discipline_id=1),
        Artwork(title="Girl with a Balloon", description="A famous street art piece by Banksy, symbolizing hope and innocence.", image_file="balloon.jpg", artist_id=9, discipline_id=3),
        Artwork(title="Infinity Mirror Room", description="An immersive art installation by Yayoi Kusama, known for its use of polka dots.", image_file="infinityroom.jpg", artist_id=10, discipline_id=4),
        Artwork(title="The Last Supper", description="A depiction of Jesus' final meal, painted by Leonardo da Vinci.", image_file="lastsupper.jpg", artist_id=1, discipline_id=1),
        Artwork(title="Pietà", description="A sculpture by Michelangelo depicting the Virgin Mary holding Jesus.", image_file="pieta.jpg", artist_id=2, discipline_id=2),
        Artwork(title="The Storm on the Sea of Galilee", description="A Baroque painting by Rembrandt depicting a turbulent sea.", image_file="stormsea.jpg", artist_id=3, discipline_id=1),
        Artwork(title="The Supper at Emmaus", description="A Baroque painting by Caravaggio, showing the moment of revelation.", image_file="emmaus.jpg", artist_id=4, discipline_id=1),
        Artwork(title="The Weeping Woman", description="A portrait by Pablo Picasso, expressing the anguish of war.", image_file="weepingwoman.jpg", artist_id=5, discipline_id=1),
        Artwork(title="The Broken Column", description="A surreal self-portrait by Frida Kahlo, symbolizing her pain.", image_file="brokencolumn.jpg", artist_id=6, discipline_id=1),
        Artwork(title="Impression, Sunrise", description="An iconic Impressionist painting by Claude Monet, giving the movement its name.", image_file="impression.jpg", artist_id=7, discipline_id=1),
        Artwork(title="The Little Dancer", description="A sculpture by Edgar Degas capturing a dancer in motion.", image_file="littledancer.jpg", artist_id=8, discipline_id=2),
        Artwork(title="Exit Through the Gift Shop", description="A film and artwork by Banksy, commenting on consumerism.", image_file="giftshop.jpg", artist_id=9, discipline_id=3),
        Artwork(title="Pumpkin", description="A large installation by Yayoi Kusama, featuring a polka-dotted pumpkin sculpture.", image_file="pumpkin.jpg", artist_id=10, discipline_id=4)
    ]
    db.session.add_all(artworks)

    db.session.commit()

    print("Seeding completed!")
