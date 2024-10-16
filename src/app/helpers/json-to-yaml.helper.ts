import { marker as T } from '@biesbjerg/ngx-translate-extract-marker';
import { dump, load } from 'js-yaml';

export function jsonToYaml(jsonData: unknown): string {
  try {
    return dump(jsonData, {
      skipInvalid: true,
      styles: {
        '!!null': 'camelcase',
        '!!bool': 'camelcase',
        '!!float': 'camelcase',
        '!!str': 'camelcase',
        '!!map': 'camelcase',
      },
    });
  } catch (error) {
    console.error(error);
    return T('Error occurred');
  }
}

export function yamlToJson(value: string): unknown {
  try {
    return load(value);
  } catch (error) {
    console.error(error);
    return T('Error occurred');
  }
}
