export default {
  name: 'timelineEntry',
  title: 'Timeline Entry',
  type: 'document',
  fields: [
    {
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: Rule => Rule.required(),
      description: 'When did this event occur?'
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'A brief title for this timeline entry'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Detailed description of what happened'
    },
    {
      name: 'relatedPeople',
      title: 'Related People',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{type: 'person'}]
      }],
      description: 'People involved in this event'
    },
    {
      name: 'relatedEvents',
      title: 'Related Events',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{type: 'event'}]
      }],
      description: 'Link to related events'
    },
    {
      name: 'relatedPlaces',
      title: 'Related Places',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{type: 'place'}]
      }],
      description: 'Places associated with this timeline entry'
    }
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date'
    },
    prepare(selection) {
      const {title, date} = selection
      return {
        title,
        subtitle: date || 'No date'
      }
    }
  }
}
