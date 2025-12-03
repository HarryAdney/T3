export default {
  name: 'person',
  title: 'Person',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'biography',
      title: 'Biography',
      type: 'text',
      description: 'A brief biography of the person'
    },
    {
      name: 'birthDate',
      title: 'Birth Date',
      type: 'date'
    },
    {
      name: 'deathDate',
      title: 'Death Date',
      type: 'date'
    },
    {
      name: 'portrait',
      title: 'Portrait Image',
      type: 'image',
      options: {
        hotspot: true
      },
      description: 'Upload a portrait photograph'
    }
  ],
  preview: {
    select: {
      title: 'name',
      media: 'portrait',
      birthDate: 'birthDate',
      deathDate: 'deathDate'
    },
    prepare(selection) {
      const {title, media, birthDate, deathDate} = selection
      const dates = [birthDate, deathDate].filter(Boolean).join(' - ')
      return {
        title,
        subtitle: dates || 'No dates',
        media
      }
    }
  }
}
