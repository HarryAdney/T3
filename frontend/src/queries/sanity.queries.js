// People queries
export const PEOPLE_QUERY = `*[_type == 'person'] | order(name asc) {
  _id,
  name,
  biography,
  birthDate,
  deathDate,
  portrait {
    asset -> {
      _id,
      url
    },
    hotspot,
    crop
  }
}`;

// Places queries
export const PLACES_QUERY = `*[_type == 'place'] | order(name asc) {
  _id,
  name,
  description,
  historicalSignificance,
  placeImage {
    asset -> {
      _id,
      url
    }
  },
  latitude,
  longitude
}`;

// Events queries
export const EVENTS_QUERY = `*[_type == 'event'] | order(startDate desc) {
  _id,
  title,
  description,
  startDate,
  endDate,
  location -> {
    _id,
    name
  }
}`;

// Photos queries
export const PHOTOS_QUERY = `*[_type == 'photo'] | order(_createdAt desc) {
  _id,
  title,
  description,
  image {
    asset -> {
      _id,
      url
    },
    hotspot,
    crop
  },
  datePhotographed,
  location -> {
    _id,
    name
  }
}`;

// Timeline queries
export const TIMELINE_QUERY = `*[_type == 'timelineEntry'] | order(date desc) {
  _id,
  date,
  title,
  description,
  "relatedPeople": relatedPeople[] -> {
    _id,
    name
  },
  "relatedEvents": relatedEvents[] -> {
    _id,
    title
  }
}`;

// Page content queries
export const PAGE_QUERY = `*[_type == 'page' && slug.current == $slug][0] {
  _id,
  title,
  slug,
  content,
  heroImage {
    asset -> {
      _id,
      url
    }
  }
}`;
