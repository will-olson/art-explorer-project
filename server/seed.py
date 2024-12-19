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
        Artwork(title="Mona Lisa", description="A portrait by Leonardo da Vinci, one of the most famous works in the world.", image_file="https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Leonardo_da_Vinci_-_Mona_Lisa.jpg/401px-Leonardo_da_Vinci_-_Mona_Lisa.jpg?20110213114729", artist_id=1, discipline_id=1, like_count=0, dislike_count=0),
        Artwork(title="David", description="A masterpiece of Renaissance sculpture by Michelangelo.", image_file="https://static.wixstatic.com/media/8b93e6_8ba2c430e8dd439ab7b41b8d9feb7c63~mv2.jpg/v1/fill/w_509,h_339,fp_0.50_0.50,q_90/8b93e6_8ba2c430e8dd439ab7b41b8d9feb7c63~mv2.webp", artist_id=2, discipline_id=2, like_count=0, dislike_count=0),
        Artwork(title="The Night Watch", description="A famous Baroque painting by Rembrandt.", image_file="https://ychef.files.bbci.co.uk/1280x720/p070wbmx.jpg", artist_id=3, discipline_id=1, like_count=0, dislike_count=0),
        Artwork(title="Judith Beheading Holofernes", description="A Baroque painting by Caravaggio, known for its dramatic use of light.", image_file="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Judith_Beheading_Holofernes-Caravaggio_%28c.1598-9%29.jpg/1200px-Judith_Beheading_Holofernes-Caravaggio_%28c.1598-9%29.jpg", artist_id=4, discipline_id=1, like_count=0, dislike_count=0),
        Artwork(title="Guernica", description="A monumental painting by Pablo Picasso, depicting the horrors of war.", image_file="https://upload.wikimedia.org/wikipedia/en/thumb/7/74/PicassoGuernica.jpg/450px-PicassoGuernica.jpg", artist_id=5, discipline_id=1, like_count=0, dislike_count=0),
        Artwork(title="The Two Fridas", description="A double self-portrait by Frida Kahlo.", image_file="https://www.fridakahlo.org/assets/img/paintings/the-two-fridas.jpg", artist_id=6, discipline_id=1, like_count=0, dislike_count=0),
        Artwork(title="Water Lilies", description="A series of Impressionist paintings by Claude Monet, capturing light and reflections.", image_file="https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Claude_Monet_-_The_Water_Lilies_-_Setting_Sun_-_Google_Art_Project.jpg/400px-Claude_Monet_-_The_Water_Lilies_-_Setting_Sun_-_Google_Art_Project.jpg", artist_id=7, discipline_id=1, like_count=0, dislike_count=0),
        Artwork(title="Ballet Rehearsal", description="A painting by Edgar Degas, showing the movement and grace of dancers.", image_file="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Edgar_Degas_-_Ballet_Rehearsal_on_Stage_-_Google_Art_Project.jpg/752px-Edgar_Degas_-_Ballet_Rehearsal_on_Stage_-_Google_Art_Project.jpg", artist_id=8, discipline_id=1, like_count=0, dislike_count=0),
        Artwork(title="Girl with a Balloon", description="A famous street art piece by Banksy, symbolizing hope and innocence.", image_file="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Banksy_Girl_and_Heart_Balloon_%282840632113%29.jpg/270px-Banksy_Girl_and_Heart_Balloon_%282840632113%29.jpg", artist_id=9, discipline_id=3, like_count=0, dislike_count=0),
        Artwork(title="Infinity Mirror Room", description="An immersive art installation by Yayoi Kusama, known for its use of polka dots.", image_file="https://hirshhorn.si.edu/wp-content/uploads/2016/12/Eternity2.jpg", artist_id=10, discipline_id=4, like_count=0, dislike_count=0),
        Artwork(title="The Last Supper", description="A depiction of Jesus' final meal, painted by Leonardo da Vinci.", image_file="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR23TQ3DZD3gr4KxL14IBocreJ7VW_37lxF_g&s", artist_id=1, discipline_id=1, like_count=0, dislike_count=0),
        Artwork(title="Pietà", description="A sculpture by Michelangelo depicting the Virgin Mary holding Jesus.", image_file="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Pieta_de_Michelangelo_-_Vaticano.jpg/220px-Pieta_de_Michelangelo_-_Vaticano.jpg", artist_id=2, discipline_id=2, like_count=0, dislike_count=0),
        Artwork(title="The Storm on the Sea of Galilee", description="A Baroque painting by Rembrandt depicting a turbulent sea.", image_file="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Rembrandt_Christ_in_the_Storm_on_the_Lake_of_Galilee.jpg/270px-Rembrandt_Christ_in_the_Storm_on_the_Lake_of_Galilee.jpg", artist_id=3, discipline_id=1, like_count=0, dislike_count=0),
        Artwork(title="The Supper at Emmaus", description="A Baroque painting by Caravaggio, showing the moment of revelation.", image_file="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/1602-3_Caravaggio%2CSupper_at_Emmaus_National_Gallery%2C_London.jpg/350px-1602-3_Caravaggio%2CSupper_at_Emmaus_National_Gallery%2C_London.jpg", artist_id=4, discipline_id=1, like_count=0, dislike_count=0),
        Artwork(title="The Weeping Woman", description="A portrait by Pablo Picasso, expressing the anguish of war.", image_file="https://upload.wikimedia.org/wikipedia/en/thumb/1/14/Picasso_The_Weeping_Woman_Tate_identifier_T05010_10.jpg/200px-Picasso_The_Weeping_Woman_Tate_identifier_T05010_10.jpg", artist_id=5, discipline_id=1, like_count=0, dislike_count=0),
        Artwork(title="The Broken Column", description="A surreal self-portrait by Frida Kahlo, symbolizing her pain.", image_file="https://upload.wikimedia.org/wikipedia/en/4/4b/The_Broken_Column.jpg", artist_id=6, discipline_id=1, like_count=0, dislike_count=0),
        Artwork(title="Impression, Sunrise", description="An iconic Impressionist painting by Claude Monet, giving the movement its name.", image_file="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Monet_-_Impression%2C_Sunrise.jpg/300px-Monet_-_Impression%2C_Sunrise.jpg", artist_id=7, discipline_id=1, like_count=0, dislike_count=0),
        Artwork(title="The Little Dancer", description="A sculpture by Edgar Degas capturing a dancer in motion.", image_file="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/The_Little_Fourteen-Year-Old_Dancer_MET_DP-14939-005.jpg/300px-The_Little_Fourteen-Year-Old_Dancer_MET_DP-14939-005.jpg", artist_id=8, discipline_id=2, like_count=0, dislike_count=0),
        Artwork(title="Exit Through the Gift Shop", description="A film and artwork by Banksy, commenting on consumerism.", image_file="https://upload.wikimedia.org/wikipedia/en/5/57/Exit-through-the-gift-shop.jpg", artist_id=9, discipline_id=3, like_count=0, dislike_count=0),
        Artwork(title="Pumpkin", description="A large installation by Yayoi Kusama, featuring a polka-dotted pumpkin sculpture.", image_file="https://amuraworld.com/images/2022/11-noviembre/01/pumpkin-g.jpg", artist_id=10, discipline_id=4, like_count=0, dislike_count=0)
    ]
    db.session.add_all(artworks)

    db.session.commit()

    print("Seeding completed!")