import type { Schema, Struct } from '@strapi/strapi';

export interface HeroStat extends Struct.ComponentSchema {
  collectionName: 'components_hero_stats';
  info: {
    displayName: 'Stat';
  };
  attributes: {
    label: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'hero.stat': HeroStat;
    }
  }
}
