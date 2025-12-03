export default {
  name: 'place',
  title: 'Place',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Place Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'General description of the place'
    },
    {
      name: 'historicalSignificance',
      title: 'Historical Significance',
      type: 'text',
      description: 'Why is this place historically important?'
    },
    {
      name: 'placeImage',
      title: 'Place Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'latitude',
      title: 'Latitude',
      type: 'number',
      description: 'Geographic latitude'
    },
    {
      name: 'longitude',
      title: 'Longitude',
      type: 'number',
      description: 'Geographic longitude'
    }
  ],
  preview: {
    select: {
      title: 'name',
      media: 'placeImage'
    }
  }
}
