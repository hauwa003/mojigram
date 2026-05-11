-- ============================================================
-- Mojigram: Seed Data
-- ============================================================

-- ------------------------------------------------------------
-- Puzzle Packs
-- ------------------------------------------------------------
INSERT INTO puzzle_packs (id, name, slug, emoji_icon, description, color, sort_order) VALUES
  ('pack_movies',  'Movies',             'movies',  '🎬', 'Guess the movie from emojis',    '#7C3AED', 1),
  ('pack_songs',   'Songs',              'songs',   '🎵', 'Name that tune from emojis',     '#EC4899', 2),
  ('pack_food',    'Food & Drink',       'food',    '🍕', 'Tasty emoji puzzles',            '#F97316', 3),
  ('pack_animals', 'Animals',            'animals', '🐾', 'Wild emoji creatures',           '#22C55E', 4),
  ('pack_places',  'Places',             'places',  '🌍', 'Around the world in emojis',     '#3B82F6', 5),
  ('pack_sports',  'Sports',             'sports',  '⚽', 'Game on with emoji sports',      '#EF4444', 6),
  ('pack_books',   'Books',              'books',   '📚', 'Classic reads in emoji form',    '#8B5CF6', 7),
  ('pack_tv',      'TV Shows',           'tv',      '📺', 'Binge-worthy emoji puzzles',     '#06B6D4', 8),
  ('pack_celebs',  'Famous People',      'celebs',  '⭐', 'Celebrity emoji challenge',      '#FACC15', 9),
  ('pack_phrases', 'Phrases & Sayings',  'phrases', '💬', 'Common phrases in emoji',        '#14B8A6', 10);

-- ------------------------------------------------------------
-- Puzzles
-- ------------------------------------------------------------

-- Movies (4 puzzles)
INSERT INTO puzzles (id, pack_id, emoji_clue, canonical_answer, accepted_answers, hint, difficulty, category, accessibility_label) VALUES
  ('puz_001', 'pack_movies', '🦁👑',       'The Lion King',      '{"the lion king","lion king"}',                           'A young cub''s journey to claim his birthright in the savanna',                    'easy',   'animated',  'Lion and crown emojis representing an animated movie'),
  ('puz_002', 'pack_movies', '🧊🚢💔',     'Titanic',            '{"titanic"}',                                             'An unsinkable ship meets an iceberg and a love story',                             'easy',   'drama',     'Ice, ship, and broken heart emojis representing a classic drama film'),
  ('puz_003', 'pack_movies', '🕷️🦸‍♂️',      'Spider-Man',         '{"spider-man","spiderman","spider man"}',                  'A teenager gets bitten and gains wall-crawling abilities',                          'easy',   'superhero', 'Spider and superhero emojis representing a Marvel movie'),
  ('puz_004', 'pack_movies', '🧙‍♂️💍🌋',     'Lord of the Rings',  '{"lord of the rings","the lord of the rings","lotr"}',    'A fellowship must destroy a powerful piece of jewelry',                             'medium', 'fantasy',   'Wizard, ring, and volcano emojis representing a fantasy film trilogy');

-- Songs (4 puzzles)
INSERT INTO puzzles (id, pack_id, emoji_clue, canonical_answer, accepted_answers, hint, difficulty, category, accessibility_label) VALUES
  ('puz_005', 'pack_songs', '☂️🎵',        'Umbrella',                       '{"umbrella"}',                                  'Rihanna will shelter you under this',                                              'medium', 'pop',           'Umbrella and music note emojis representing a pop song'),
  ('puz_006', 'pack_songs', '🔥🎸👧',      'Girl on Fire',                   '{"girl on fire"}',                              'Alicia Keys sang about this blazing young woman',                                  'medium', 'pop',           'Fire, guitar, and girl emojis representing a pop song'),
  ('puz_007', 'pack_songs', '⭐🌙✨',      'Twinkle Twinkle Little Star',    '{"twinkle twinkle little star","twinkle twinkle"}', 'A nursery rhyme about a shining object in the night sky',                       'easy',   'nursery rhyme', 'Star, moon, and sparkles emojis representing a nursery rhyme'),
  ('puz_008', 'pack_songs', '🎤💃🌹',      'La Bamba',                       '{"la bamba"}',                                  'Ritchie Valens made this traditional Mexican song famous',                         'hard',   'classic',       'Microphone, dancer, and rose emojis representing a classic song');

-- Food & Drink (4 puzzles)
INSERT INTO puzzles (id, pack_id, emoji_clue, canonical_answer, accepted_answers, hint, difficulty, category, accessibility_label) VALUES
  ('puz_009', 'pack_food', '🍟🍔',         'Burger and Fries',        '{"burger and fries","hamburger and fries","fast food","burger & fries"}',  'The most classic fast food combo you can order',                                   'easy',   'fast food', 'French fries and hamburger emojis representing a classic meal'),
  ('puz_010', 'pack_food', '🍫🍪',         'Chocolate Chip Cookie',   '{"chocolate chip cookie","chocolate chip cookies","chocolate cookie"}',    'A beloved baked treat with sweet morsels inside',                                  'easy',   'dessert',   'Chocolate bar and cookie emojis representing a baked dessert'),
  ('puz_011', 'pack_food', '🍣🐟',         'Sushi',                   '{"sushi"}',                                                                'A Japanese delicacy often served with wasabi and soy sauce',                        'easy',   'japanese',  'Sushi and fish emojis representing Japanese cuisine'),
  ('puz_012', 'pack_food', '🧇🍓🍦',      'Waffle Sundae',           '{"waffle sundae","waffles and ice cream","waffle with ice cream","strawberry waffle"}', 'A breakfast item topped with fruit and a frozen treat',                 'medium', 'dessert',   'Waffle, strawberry, and ice cream emojis representing a dessert');

-- Animals (4 puzzles)
INSERT INTO puzzles (id, pack_id, emoji_clue, canonical_answer, accepted_answers, hint, difficulty, category, accessibility_label) VALUES
  ('puz_013', 'pack_animals', '🦊',         'Fox',          '{"fox","a fox"}',                          'A clever, bushy-tailed woodland creature',                                         'easy',   'mammal', 'Fox emoji representing the animal'),
  ('puz_014', 'pack_animals', '🐻❄️',       'Polar Bear',   '{"polar bear"}',                           'This large predator roams the Arctic ice',                                         'easy',   'mammal', 'Bear and snowflake emojis representing an Arctic animal'),
  ('puz_015', 'pack_animals', '🦅🗽',       'Bald Eagle',   '{"bald eagle","eagle","american eagle"}',  'The national bird of the United States',                                           'medium', 'bird',   'Eagle and Statue of Liberty emojis representing the American national bird'),
  ('puz_016', 'pack_animals', '🐙🧠',       'Octopus',      '{"octopus"}',                              'This sea creature has eight arms and is surprisingly intelligent',                  'medium', 'marine', 'Octopus and brain emojis representing a smart sea creature');

-- Places (4 puzzles)
INSERT INTO puzzles (id, pack_id, emoji_clue, canonical_answer, accepted_answers, hint, difficulty, category, accessibility_label) VALUES
  ('puz_017', 'pack_places', '🗼🇫🇷',       'Paris',      '{"paris","paris france"}',       'The City of Light, known for a famous iron tower',                                 'easy',   'city',   'Tower and French flag emojis representing the French capital'),
  ('puz_018', 'pack_places', '🗽🏙️',        'New York',   '{"new york","new york city","nyc"}', 'The Big Apple, home to a famous green lady with a torch',                      'easy',   'city',   'Statue of Liberty and cityscape emojis representing an American city'),
  ('puz_019', 'pack_places', '🏔️🧘',        'Tibet',      '{"tibet","himalayas","nepal"}',   'A spiritual region high up in the tallest mountain range',                         'hard',   'region', 'Mountain and meditation emojis representing a high-altitude spiritual region'),
  ('puz_020', 'pack_places', '🏖️🌴🎰',     'Las Vegas',  '{"las vegas","vegas"}',           'What happens here, stays here - a desert city of entertainment',                   'medium', 'city',   'Beach, palm tree, and slot machine emojis representing an entertainment city');

-- Sports (3 puzzles)
INSERT INTO puzzles (id, pack_id, emoji_clue, canonical_answer, accepted_answers, hint, difficulty, category, accessibility_label) VALUES
  ('puz_021', 'pack_sports', '⚽🏆🌍',      'World Cup',   '{"world cup","fifa world cup","the world cup"}',              'The biggest international football tournament held every 4 years',                  'easy',   'football',    'Soccer ball, trophy, and globe emojis representing an international tournament'),
  ('puz_022', 'pack_sports', '🏊‍♂️🏃‍♂️🚴',     'Triathlon',   '{"triathlon","ironman","iron man triathlon"}',                 'An endurance race combining three different disciplines',                           'medium', 'multi-sport', 'Swimming, running, and cycling emojis representing a multi-sport event'),
  ('puz_023', 'pack_sports', '🥊🔔',        'Boxing',      '{"boxing","boxing match"}',                                    'A combat sport where rounds begin and end with a sound',                            'easy',   'combat',      'Boxing glove and bell emojis representing a combat sport');

-- Books (3 puzzles)
INSERT INTO puzzles (id, pack_id, emoji_clue, canonical_answer, accepted_answers, hint, difficulty, category, accessibility_label) VALUES
  ('puz_024', 'pack_books', '🧙‍♂️⚡👦',      'Harry Potter',                   '{"harry potter"}',                                                  'A boy with a lightning-shaped scar attends a school of magic',                      'easy',   'fantasy',    'Wizard, lightning, and boy emojis representing a fantasy book series'),
  ('puz_025', 'pack_books', '🐛🦋',         'The Very Hungry Caterpillar',    '{"the very hungry caterpillar","very hungry caterpillar","hungry caterpillar"}', 'A children''s book about metamorphosis after eating everything',       'medium', 'children',   'Caterpillar and butterfly emojis representing a children''s book'),
  ('puz_026', 'pack_books', '👸❄️',          'The Snow Queen',                 '{"the snow queen","snow queen","frozen"}',                           'A Hans Christian Andersen tale about a royal with icy powers',                      'medium', 'fairy tale', 'Princess and snowflake emojis representing a fairy tale');

-- TV Shows (4 puzzles)
INSERT INTO puzzles (id, pack_id, emoji_clue, canonical_answer, accepted_answers, hint, difficulty, category, accessibility_label) VALUES
  ('puz_027', 'pack_tv', '👨‍🔬💊🔵',      'Breaking Bad',     '{"breaking bad"}',       'A chemistry teacher turns to cooking something illegal in the desert',              'medium', 'drama',   'Scientist, pill, and blue circle emojis representing a TV drama'),
  ('puz_028', 'pack_tv', '🐉👑⚔️',       'Game of Thrones',  '{"game of thrones","got"}', 'Noble families battle for a pointy iron chair in a fantasy realm',               'easy',   'fantasy', 'Dragon, crown, and sword emojis representing a fantasy TV series'),
  ('puz_029', 'pack_tv', '👽🚲🧒',        'Stranger Things',  '{"stranger things"}',    'Kids in a small town discover a parallel dimension called the Upside Down',        'medium', 'sci-fi',  'Alien, bicycle, and child emojis representing a sci-fi TV series'),
  ('puz_030', 'pack_tv', '🏝️💼🔢',       'Lost',             '{"lost"}',               'Plane crash survivors find mysterious numbers on a strange island',                 'hard',   'drama',   'Island, briefcase, and numbers emojis representing a TV drama');

-- Famous People (3 puzzles)
INSERT INTO puzzles (id, pack_id, emoji_clue, canonical_answer, accepted_answers, hint, difficulty, category, accessibility_label) VALUES
  ('puz_031', 'pack_celebs', '🎤👑💃',      'Beyonce',          '{"beyonce","beyoncé","queen bey"}',    'This singer''s fanbase is called the Beyhive',                                     'easy',   'musician', 'Microphone, crown, and dancer emojis representing a famous singer'),
  ('puz_032', 'pack_celebs', '🎾👸',        'Serena Williams',  '{"serena williams","serena"}',         'This athlete dominated her racquet sport with 23 Grand Slam titles',                'medium', 'athlete',  'Tennis and princess emojis representing a famous athlete'),
  ('puz_033', 'pack_celebs', '🚀🔋🚗',     'Elon Musk',        '{"elon musk","musk"}',                 'This tech CEO runs a space company and an electric car company',                    'easy',   'tech',     'Rocket, battery, and car emojis representing a tech entrepreneur');

-- Phrases & Sayings (4 puzzles)
INSERT INTO puzzles (id, pack_id, emoji_clue, canonical_answer, accepted_answers, hint, difficulty, category, accessibility_label) VALUES
  ('puz_034', 'pack_phrases', '🐘🏠',       'Elephant in the Room',  '{"elephant in the room","the elephant in the room"}',  'An obvious problem nobody wants to talk about',                                    'medium', 'idiom', 'Elephant and house emojis representing a common idiom'),
  ('puz_035', 'pack_phrases', '⏰✈️',        'Time Flies',            '{"time flies"}',                                       'Hours seem to pass quickly when you are having fun',                               'easy',   'idiom', 'Clock and airplane emojis representing an idiom about passing time'),
  ('puz_036', 'pack_phrases', '💡💡',        'Bright Idea',           '{"bright idea","a bright idea"}',                      'What you have when inspiration strikes twice as hard',                              'easy',   'idiom', 'Two light bulb emojis representing an idiom about inspiration'),
  ('puz_037', 'pack_phrases', '🔑🎯💰',     'Hit the Jackpot',       '{"hit the jackpot","jackpot"}',                        'Achieving great success or winning big',                                           'medium', 'idiom', 'Key, target, and money emojis representing an idiom about success');

-- ------------------------------------------------------------
-- Update puzzle_count for each pack
-- ------------------------------------------------------------
UPDATE puzzle_packs SET puzzle_count = (
  SELECT COUNT(*) FROM puzzles WHERE puzzles.pack_id = puzzle_packs.id
);

-- ------------------------------------------------------------
-- Daily Challenge: 2026-05-11
-- ------------------------------------------------------------
INSERT INTO daily_challenges (id, challenge_date, title) VALUES
  ('daily_2026_05_11', '2026-05-11', 'Sunday Funday Mix');

INSERT INTO daily_challenge_puzzles (challenge_id, puzzle_id, sort_order) VALUES
  ('daily_2026_05_11', 'puz_001', 1),  -- The Lion King (easy, movies)
  ('daily_2026_05_11', 'puz_007', 2),  -- Twinkle Twinkle Little Star (easy, songs)
  ('daily_2026_05_11', 'puz_022', 3),  -- Triathlon (medium, sports)
  ('daily_2026_05_11', 'puz_029', 4),  -- Stranger Things (medium, tv)
  ('daily_2026_05_11', 'puz_034', 5);  -- Elephant in the Room (medium, phrases)
