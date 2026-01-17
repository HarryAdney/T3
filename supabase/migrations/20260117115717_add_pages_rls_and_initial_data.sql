/*
  # Add Pages Table RLS Policies and Initial Data

  1. Security Policies
    - Allow authenticated users to insert pages
    - Allow authenticated users to update pages
    - Allow authenticated users to delete pages
    - Public can view published pages (already exists)

  2. Initial Page Records
    - Home page with hero images, sections, and content
    - Four Townships page with township descriptions
    - Bishopdale Valley page with historical content

  3. Notes
    - Each page has a unique slug for routing
    - Content stored as JSONB for flexibility
    - Published flag controls public visibility
*/

-- Add RLS policies for authenticated users
CREATE POLICY "Authenticated users can insert pages"
  ON pages FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update pages"
  ON pages FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete pages"
  ON pages FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL);

-- Insert Home page
INSERT INTO pages (slug, title, meta_description, published, content)
VALUES (
  'home',
  'Thoralby Through Time',
  'Discover the rich heritage of Thoralby and Bishopdale through stories, photographs, and maps spanning centuries of Yorkshire Dales history.',
  true,
  '{
    "heroImages": [
      "/images/hero/home-page.webp",
      "/images/hero/bishopdale-valley.webp",
      "/images/hero/west-burton-village-green.webp",
      "/images/hero/bishopdale-beck-1938.webp"
    ],
    "heroTitle": "Thoralby Through Time",
    "heroSubtitle": "Discover the rich heritage of Thoralby and Bishopdale through stories, photographs, and maps spanning centuries of Yorkshire Dales history.",
    "stats": {
      "people": 150,
      "buildings": 75,
      "events": 200,
      "gallery": 500
    },
    "aboutSection": {
      "title": "About This Project",
      "description": "This website explores the history of Thoralby, the neighbouring villages of Newbiggin and West Burton, and the scattered hill farms in the rest of Bishopdale from prehistory to the late twentieth century.\\n\\nI was born at Holmeside Farm in Thoralby and raised in the village, where my family has lived for several generations. This website provides a wide range of primary evidence about Thoralby, Newbiggin, Bishopdale and West Burton. Many of the documents have been transcribed to avoid breaching copyright laws. Please notify me if you find any errors or if you have any relevant information or images for the site.\\n\\nThank you.\\n\\nPenny Ellis (née Snaith)"
    },
    "sections": [
      {
        "title": "People & Families",
        "description": "Discover the stories of families who shaped Thoralby through generations.",
        "path": "/archive/people-families",
        "icon": "Users"
      },
      {
        "title": "Buildings & Places",
        "description": "Explore the historic architecture and landmarks of Bishopdale.",
        "path": "/archive/buildings-places",
        "icon": "Building2"
      },
      {
        "title": "Historical Timeline",
        "description": "Journey through centuries of events that defined our community.",
        "path": "/timeline",
        "icon": "Clock"
      },
      {
        "title": "Photo Archive",
        "description": "Browse my collection of historical photographs and images.",
        "path": "/archive/photographs",
        "icon": "Image"
      },
      {
        "title": "Maps & Geography",
        "description": "Compare historical and modern maps of Thoralby and surroundings.",
        "path": "/archive/maps",
        "icon": "Map"
      }
    ],
    "ctaSection": {
      "title": "Help Us Preserve Our Heritage",
      "description": "Do you have photographs, documents, or stories about Thoralby and Bishopdale? I''d love to hear from you and add your contributions to my archive."
    }
  }'::jsonb
)
ON CONFLICT (slug) DO NOTHING;

-- Insert Four Townships page
INSERT INTO pages (slug, title, meta_description, published, content)
VALUES (
  'four-townships',
  'The Four Townships',
  'Explore the four townships of Bishopdale: Thoralby, Bishopdale, Burton-cum-Walden, and Newbiggin.',
  true,
  '{
    "heroImage": "/images/hero/hero-four-townships.webp",
    "heroTitle": "The Four Townships",
    "heroSubtitle": "Thoralby, Bishopdale, Burton-cum-Walden, and Newbiggin",
    "townships": [
      {
        "name": "Thoralby Township",
        "content": "The present-day township comprises 2,857 acres. The houses outside the main village are to the east, Spickles Farm and Riddings and to the west Gayle Ing, Barker, Cote Bottom, Blind Syke, Swinacote, Howsyke, Crooksby and Littleburn."
      },
      {
        "name": "Bishopdale Township",
        "content": "The present-day township comprises 4,728 acres. There has been no village in the township since Croxby became depopulated in the Middle Ages, since when the township boundaries have changed, placing the remains of Croxby in Thoralby township. The scattered farms and houses that make up Bishopdale are Dale Head, Howgill, Kidstones, Longridge, Newhouse, The Rookery (Coach House), Scar Top, Smelter, Myres Garth, Ribba Hall, Underscarr, The Old School House, Newhouse Gill and Dalefoot."
      },
      {
        "name": "Burton-cum-Walden Township",
        "content": "The present-day township comprises 7,659 acres. It occupies the lower ends of the valleys of Bishopdale and Walden and includes the village of West Burton, including the Black Bull, Flanders Hall, How Raine, Sorrelsykes, Morpeth Gate, Edgley, Adams Bottoms, Brown Lea, and Eshington. The valley of Walden includes Riddings, Cote, White Row, High and Low Dove Scarr, Chapel Green, Nell Bank, Bridge End, Ashes, Grange Farm, Uncles Farm, Kentucky House, Walden Head, Rowton Gill, Hill Top, Haw, Hargill, Cowston Gill, Cross and Forelands. Nellholme, Hestholme and Hestholme East, formerly a detached part of Thoralby township, are now part of Burton-cum-Walden township."
      },
      {
        "name": "Newbiggin Township",
        "content": "The present-day township comprises 1,696 acres. The houses outside the main village are The Street Head Inn, Cross Lanes Farm, The Bunkhouse (formerly Cross Lanes School), East Lane House, West Lane House, and Misty Field."
      }
    ],
    "footer": "All four townships are in the Wapentake of Hang West, formerly in the North Riding of Yorkshire and are now in the county of North Yorkshire. See diagram below."
  }'::jsonb
)
ON CONFLICT (slug) DO NOTHING;

-- Insert Bishopdale Valley page
INSERT INTO pages (slug, title, meta_description, published, content)
VALUES (
  'bishopdale-valley',
  'Bishopdale Valley',
  'A tributary valley on the south side of Wensleydale with rich history dating back to the Ice Age.',
  true,
  '{
    "heroImage": "/images/hero/bishopdale-valley.webp",
    "heroTitle": "Bishopdale Valley",
    "heroSubtitle": "A tributary valley on the south side of Wensleydale",
    "sections": [
      {
        "type": "text",
        "content": "[This section is under construction]."
      },
      {
        "type": "text",
        "content": "Bishopdale, a tributary valley on the south side of Wensleydale, is about eight miles long and is orientated in a south-west to north-east direction from the head of the valley to its mouth. It was glaciated during the Ice Ages and once held a glacial lake called Bishopdale Carr, which dried up in the seventeenth century. Its ''U'' shaped profile is typical of valleys that have undergone prolonged glaciation. The valley is drained by Bishopdale Beck, which flows into the River Ure about a mile east of Aysgarth."
      },
      {
        "type": "text",
        "content": "The name ''Bishopdale'' has nothing to do with bishops or the church in general. It was named after Biscopp, a local lord from the Anglian period of occupation."
      },
      {
        "type": "heading",
        "content": "The Origins of Bishopdale"
      },
      {
        "type": "text",
        "content": "Bishopdale, on the south side of Wensleydale in North Yorkshire, was a glaciated valley during the last Ice Age and contained a glacial lake when the Ice Age ended. Sedimentary deposits from that lake left rich alluvial soil in the valley bottom in contrast to the thin alkaline soils on the surrounding hillsides."
      },
      {
        "type": "text",
        "content": "The first human inhabitants arrived in this area between 8,000 and 10,000 years ago. At first, they were hunter-gatherers who lived nomadic lives and took shelter where they could. Over time, they began to settle the land, domesticate animals and cultivate grain and vegetables. They also built a henge monument in lower Bishopdale known as Castle Dykes, the remains of which can be seen between Aysgarth and Gayle Ing."
      },
      {
        "type": "image",
        "src": "/images/maps/aerial-view-castle-dykes.webp",
        "alt": "Aerial view of Castle Dykes"
      },
      {
        "type": "text",
        "content": "No direct evidence of Neolithic farming communities has survived in Bishopdale, but Castle Dykes is believed to have been a Neolithic henge, probably built for religious or communal purposes, that dates from around 2000 to 1800 B.C. It would have required a lot of manpower over a considerable period of time to construct Castle Dykes and it is hard to conceive of it having been possible without the presence of several settled farming communities living nearby."
      },
      {
        "type": "text",
        "content": "High above West Burton, one mile to the south east on bleak and windswept Burton Moor, are relics of an extensive Iron Age settlement. The 18 circular huts and nine enclosures which were built of rough – hewn stone are in an unusual honeycomb arrangement. When established, perhaps 2,500 years ago, this settlement was one of up to 15 prehistoric villages in and around Wensleydale. Many of these have since been almost totally destroyed and none, though formally classified as protected historical monuments, has yet been surveyed in detail by archaeologists. Local tradition names these settlements as Egton and Fenton."
      },
      {
        "type": "text",
        "content": "The Burton Moor settlement housed the first people ever to live in the West Burton area. Nearby springs provided water for people and cattle, as well as for fields which were crudely cultivated. At 1,500 feet there were few trees, so the inhabitants could more easily protect themselves from wild animals roaming the forests below. Sentries would probably have been posted nearby, on the Height of Hazely or other parts of Penhill, to warn of human marauders."
      },
      {
        "type": "text",
        "content": "The fate of the ancient Britons who lived in this settlement is unknown. Nor is it known when people started settling on the current site of West Burton, or Burton – in – Bishopdale as it was called until the late 17th century. It is possible that the Romans, who built camps and towns at York (Eburacum) and Aldbrough (Isurium Brigantium) on their conquering march north, forayed in the Burton area since there were forts at Wensley and Bainbridge and a villa at Middleham. It is also possible that Burton was brought into existence during the Celtic kingdom of Deira (York) in the sixth to the eighth centuries or by the Saxon kingdom of Northumbria, which incorporated Deira, in the eighth and ninth centuries."
      },
      {
        "type": "text",
        "content": "It is much more likely, however, that the present village dates back to the Danish invasion and settlement of the ninth and tenth centuries. Some evidence for this is that the names of nearby villages such as Aysgarth, Thoralby, Melmerby and Carperby are of Danish origin. Moreover, around the village there is clear evidence of terraces and strip lynchets where cereals would have been cultivated centuries ago. These land patterns strongly resemble those of other, better-surveyed parts of Danelaw. Many of the existing boundaries of West Burton houses, especially on the southern side of the main street, follow the old, slightly curved toft (homestead plus arable land) boundaries. The second wave of Viking invaders, which included more Norwegians, then settled extensively in the area. Many local terms are old Norse words such as beck (small river), foss (waterfall), gill (narrow valley with stream), garth (fenced area), rigg (ridge), fell (high moorland), slack (depression in hillside), and biggin (building), see the Origins of Burton."
      },
      {
        "type": "text",
        "content": "The earliest known settlements in Bishopdale were collections of hut circles and livestock enclosures, traces of which can be found on the hills on either side of the dale. The best preserved lies on Burton Moor on the west flank of Pen Hill. It dates from sometime between 1800 and 200 B.C. The small circles on this aerial photograph were huts and the larger circles were livestock enclosures. There is also evidence of a field system."
      },
      {
        "type": "text",
        "content": "Other settlements from that period on the hillsides above Bishopdale can be found on Stake Moss, in Gayle Ing Gill and alongside the track from Kidstones to Stalling Busk. At that time, the climate was wetter than today, which is probably why the settlements were on well-drained limestone high above the boggy valley bottoms."
      },
      {
        "type": "image",
        "src": "/images/maps/aerial-view-of-gayle-ing-hut-circle.webp",
        "alt": "Aerial view of Gayle Ing hut circles",
        "caption": "Aerial view of Gayle Ing hut circles."
      }
    ]
  }'::jsonb
)
ON CONFLICT (slug) DO NOTHING;
