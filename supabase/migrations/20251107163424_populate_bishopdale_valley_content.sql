/*
  # Populate Bishopdale Valley Page with Actual Content

  1. Purpose
    - Replace the empty placeholder content in the bishopdale-valley page
    - Convert the existing static React component content into Puck editor format
    - Enable immediate editing of the Bishopdale Valley page with full content
  
  2. Content Structure
    - Hero section with page title and introduction
    - Three feature cards (Mission, Archive, Community Involvement)
    - Info section about Thoralby
    - Bottom text with heart icon
  
  3. Implementation
    - Uses new FeatureCard and InfoSection components from Puck config
    - Preserves all existing content from BishopdaleValley.tsx
    - Maintains visual design and layout structure
*/

UPDATE puck_pages
SET 
  content = '{
    "content": [
      {
        "type": "Hero",
        "props": {
          "id": "hero-1",
          "title": "About Thoralby Through Time",
          "description": "A community project dedicated to preserving and sharing the rich history of Thoralby and the surrounding Bishopdale area in North Yorkshire."
        }
      },
      {
        "type": "FeatureCard",
        "props": {
          "id": "feature-mission",
          "icon": "Target",
          "iconBg": "sage",
          "title": "Our Mission",
          "content": "To collect, preserve, and share the stories, photographs, and records that tell the tale of Thoralby and Bishopdale. We believe that local history matters, and that by understanding where we''ve come from, we can better appreciate where we are and where we''re going."
        }
      },
      {
        "type": "FeatureCard",
        "props": {
          "id": "feature-archive",
          "icon": "Archive",
          "iconBg": "parchment",
          "title": "The Archive",
          "content": "Our growing archive includes historical photographs, documents, maps, and personal stories dating back centuries. Each item has been carefully catalogued and preserved for future generations.\\n\\nThe collection covers all aspects of life in Thoralby and Bishopdale: from farming and industry to education, religion, and community events. We''re particularly interested in ordinary, everyday life as well as extraordinary moments that shaped our community."
        }
      },
      {
        "type": "FeatureCard",
        "props": {
          "id": "feature-community",
          "icon": "Users",
          "iconBg": "sage",
          "title": "Community Involvement",
          "content": "This project belongs to the community. Many of the photographs, stories, and documents in our archive have been generously contributed by local residents and their families.\\n\\nIf you have memories, photographs, or documents related to Thoralby and Bishopdale that you''d like to share, we''d love to hear from you. Every contribution, no matter how small, helps us build a more complete picture of our shared history."
        }
      },
      {
        "type": "InfoSection",
        "props": {
          "id": "about-thoralby",
          "title": "About Thoralby",
          "bgColor": "gradient",
          "content": "Thoralby is a small village in Bishopdale, one of the side dales of Wensleydale in the Yorkshire Dales National Park. The village has a rich history dating back to medieval times, with St. Oswald''s Church featuring Norman architecture from the 12th century.\\n\\nThroughout its history, Thoralby has been primarily an agricultural community, with farming and sheep rearing forming the backbone of local life. The village has also been home to various craftspeople, including stonemasons, blacksmiths, and shopkeepers who served the surrounding area.\\n\\nToday, Thoralby maintains its rural character while welcoming visitors who come to enjoy the stunning Yorkshire Dales landscape and explore its rich heritage."
        }
      }
    ],
    "root": {
      "props": {
        "title": "Bishopdale Valley"
      }
    }
  }',
  updated_at = now()
WHERE slug = 'bishopdale-valley';