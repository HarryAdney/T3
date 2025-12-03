export default {
  name: 'photo',
  title: 'Photo',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Photo Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Describe what is shown in the photograph'
    },
    {
      name: 'datePhotographed',
      title: 'Date Photographed',
      type: 'date',
      description: 'When was this photo taken?'
    },
    {
      name: 'photographer',
      title: 'Photographer',
      type: 'reference',
      to: [{type: 'person'}],
      description: 'Who took this photograph?'
    },
    {
      name: 'location',
      title: 'Location',
      type: 'reference',
      to: [{type: 'place'}],
      description: 'Where was this photo taken?'
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      date: 'datePhotographed'
    },
    prepare(selection) {
      const {title, media, date} = selection
      return {
        title,
        subtitle: date || 'No date',
        media
      }
    }
  }
}
