export default {
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Event Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'What happened during this event?'
    },
    {
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      validation: Rule => Rule.required()
    },
    {
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      description: 'Leave empty if it was a single-day event'
    },
    {
      name: 'location',
      title: 'Location',
      type: 'reference',
      to: [{type: 'place'}],
      description: 'Where did this event take place?'
    },
    {
      name: 'participants',
      title: 'Participants',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{type: 'person'}]
      }],
      description: 'Who was involved in this event?'
    }
  ],
  preview: {
    select: {
      title: 'title',
      date: 'startDate'
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
