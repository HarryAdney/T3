import { PageWrapper } from '../../../components/PageWrapper';
import { Breadcrumbs } from '../../../components/Breadcrumbs';
import { Scissors, Home, Users, Wheat } from 'lucide-react';

export function NewbigginIndustry() {
  return (
    <PageWrapper>
      <div className="relative h-64 mb-8 overflow-hidden md:h-80 lg:h-96">
        <div className="absolute inset-0 sepia-overlay">
          <img
            src="https://images.pexels.com/photos/1145434/pexels-photo-1145434.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Traditional cottage industry"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-stone-900/70 to-stone-900/20">
          <div className="text-center text-white">
            <h1 className="mb-4 font-serif text-4xl font-bold md:text-5xl lg:text-6xl">
              Industry in Newbiggin
            </h1>
            <p className="text-lg md:text-xl">
              Cottage industries supporting farm life
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'The Four Townships', path: '/four-townships' },
            { label: 'Newbiggin', path: '/townships/newbiggin' },
            { label: 'Industry', path: '/townships/newbiggin/industry' },
          ]}
        />

        <div className="mb-12">
          <p className="text-lg leading-relaxed text-stone-600">
            As a small agricultural hamlet, Newbiggin never developed the range of trades found in
            larger villages. Instead, its industrial activities centered on cottage industries that
            supplemented farm income and could be performed alongside agricultural work. These
            modest but essential activities were crucial to family survival.
          </p>
        </div>

        <div className="grid gap-8 mb-12 md:grid-cols-2">
          <div className="card">
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-sage-100">
              <Scissors className="w-6 h-6 text-sage-700" />
            </div>
            <h2 className="mb-3 font-serif text-xl font-semibold text-stone-900">
              Hand-Knitting
            </h2>
            <p className="text-stone-700">
              Hand-knitting was the primary cottage industry in Newbiggin. Women and children
              knitted stockings, gloves, and other garments during evening hours and winter
              months when farm work was light. The items were sold at markets in Leyburn and
              Hawes, providing essential cash income for families who otherwise relied on
              subsistence farming.
            </p>
          </div>

          <div className="card">
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-parchment-200">
              <Wheat className="w-6 h-6 text-parchment-700" />
            </div>
            <h2 className="mb-3 font-serif text-xl font-semibold text-stone-900">
              Agricultural Processing
            </h2>
            <p className="text-stone-700">
              Families processed their own agricultural products. Butter and cheese making were
              essential skills, with surplus sold for cash. Wool from sheep was prepared for
              market or for home knitting. These processing activities were labor-intensive but
              added value to farm produce and extended women's work throughout the year.
            </p>
          </div>

          <div className="card">
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-sage-100">
              <Home className="w-6 h-6 text-sage-700" />
            </div>
            <h2 className="mb-3 font-serif text-xl font-semibold text-stone-900">
              Self-Sufficiency
            </h2>
            <p className="text-stone-700">
              Newbiggin families needed to be highly self-sufficient. They produced their own
              building materials from local stone, repaired tools and equipment, and made many
              items needed for daily life. This independence was born of necessity but created
              a rich tradition of practical skills passed through generations.
            </p>
          </div>

          <div className="card">
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-parchment-200">
              <Users className="w-6 h-6 text-parchment-700" />
            </div>
            <h2 className="mb-3 font-serif text-xl font-semibold text-stone-900">
              Cooperative Labor
            </h2>
            <p className="text-stone-700">
              Families worked together during peak times like haymaking and sheep shearing.
              This cooperative approach was essential in a hamlet without access to hired
              labor. The tradition of mutual aid extended to sharing skills and equipment,
              creating strong community bonds forged through shared work.
            </p>
          </div>
        </div>

        <div className="prose prose-stone max-w-none">
          <div className="p-8 mb-8 rounded-2xl bg-gradient-to-r from-sage-50 to-parchment-50">
            <h2 className="mb-4 font-serif text-2xl font-semibold text-stone-900">
              The Knitting Tradition
            </h2>
            <p className="mb-4 text-stone-700">
              Hand-knitting deserves special mention as it was central to Newbiggin's economy
              for centuries. Children learned to knit at an early age, and the skill remained
              essential throughout life. Knitting was perfectly suited to the agricultural
              rhythm, filling winter evenings and allowing women to work while tending children
              or watching over animals.
            </p>
            <p className="text-stone-700">
              The items produced were not luxury goods but practical necessities with a ready
              market. Dales stockings were renowned for their quality and durability. The cash
              earned, while modest, was often the only money income available to women, giving
              them a degree of economic independence unusual for the time.
            </p>
          </div>

          <div className="p-8 card">
            <h2 className="mb-4 font-serif text-2xl font-semibold text-stone-900">
              A Way of Life
            </h2>
            <p className="mb-4 text-stone-700">
              Newbiggin's industrial activities were less about formal enterprises and more
              about the endless round of productive work that sustained farming families. Every
              member contributed according to their abilities, with tasks carefully organized
              around the agricultural calendar.
            </p>
            <p className="text-stone-700">
              This integrated approach to work, where farming and cottage industry intertwined,
              created a distinctive way of life. While less prosperous than areas with more
              diverse industries, Newbiggin families developed resilience and resourcefulness
              that allowed them to endure in this challenging environment for generations.
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
