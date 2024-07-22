

export const getIdentifier = (widgetParams: any) => {

  // Get the parameters from the widget
  const { parameters } = widgetParams;

  // Get the identifier directly from the parameters object
  if ( parameters.hasOwnProperty('identifier') ) {
    return parameters.identifier;
  }

  // Or get the identifier from the meta tag
  if (parameters.hasOwnProperty('identifier_meta_field')) {

    // Get identifier_meta_field and the meta tag
    const identifier_meta_field = parameters.identifier_meta_field;
    const meta = document.querySelector(`meta[name="${identifier_meta_field}"]`);

    //check meta, identifier_prefix and identifier_regex
    if (meta && parameters.hasOwnProperty('identifier_prefix') && parameters.hasOwnProperty('identifier_regex')) {

      const identifier_prefix = parameters.identifier_prefix;
      const identifier_regex = parameters.identifier_regex;
      const metaContent = meta.getAttribute('content');

      //check if metaContent matches the regex
      const match = metaContent?.match(identifier_regex);
      if (meta && match) return identifier_prefix + match[1];

    } else {

      if (meta) return meta.getAttribute('content');
    }

  }

  // Or get the identifier from the URL
  if (parameters.hasOwnProperty('identifier_prefix') && parameters.hasOwnProperty('identifier_regex')) {

    const identifier_prefix = parameters.identifier_prefix;
    const identifier_regex = parameters.identifier_regex;
    const item_url = 'http://sedici.unlp.edu.ar/handle/10915/113959';

    const match = item_url.match(identifier_regex);

    if (match) return identifier_prefix + match[1];

  }

  
  console.log('No identifier found');
  return null;
}