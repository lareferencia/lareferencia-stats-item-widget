# Lareferencia-item-widget
Widget especializado que exhibe las estadìsticas del item en todos los niveles (Repositorio, Nodo Nacional y LA Referencia)

## Instalacíon

### 1. Etiqueta HTML y renderizado

1. Ubicar el lugar del HTML donde se desee incrustrar el widget.
2. Colocar una etiqueta <div></div> con el id "lrhw-widget" (dentro de esa etiqueta se renderizará el widget), quedará de esta forma:
   
   ```
   <div id="usage-stats"></div>
   ```

### 2. Script que utiliza los archivos Javascript

1. Ubicar la etiqueta <body></body>, posiblemente dentro de "index.html"
2. Copiar y pega dentro de dicha etiqueta el siguiente script:

   ```
    <script>
      (function (window, document, scriptTag, globalVar, paramsKey, cdnUrl) {
        window[globalVar] =
          window[globalVar] ||
          function () {
            window[globalVar][paramsKey] = window[globalVar][paramsKey] || {};
            Object.assign(window[globalVar][paramsKey], arguments[0] || {});
          };

        const scriptElement = document.createElement(scriptTag);
        scriptElement.id = globalVar;
        scriptElement.src = cdnUrl;
        scriptElement.type = "module";
        scriptElement.defer = true; 

        scriptElement.onerror = function () {
          console.error(`Failed to load script ${scriptElement.src}`);
        };

        const firstScript = document.getElementsByTagName(scriptTag)[0];
        firstScript.parentNode.insertBefore(scriptElement, firstScript);
      })(
        window,
        document,
        "script",
        "lrw",
        "parameters",
        "https://cdn.jsdelivr.net/gh/lareferencia/lrw@2.0.7/dist/lrw.js"
      );
      window["lrw"]({
        widget_div_id: "usage-stats",

        identifier: "",
        identifier_meta_field: "",
        identifier_prefix: "",
        identifier_regex: "",
        
        scope_labels: {
          N: "Nodo Nacional",
          R: "Repositorio",
        },
        country: "ISO COUNTRY",
        repository_source: "SOURCE REPOSITORIO",
        lang: "es",
      });
    </script> 
   
   ```

3. Dicho script consta de dos partes, la primera es una función para cargar los archivos .js de cdn.jsdeliver ("https://cdn.jsdelivr.net/gh/lareferencia/lrw@2.0.7/dist/lrw.js"), el numero que sigue luego de la @ es la versión del widget, debe ser modificado cuando hayan actualizaciones disponibles.

4. La segunda parte es un objeto dentro de "window['lrw]" que debe ser modificado con los datos apropiados para exhibir las estadìsticas del item.

### 4. Configuracion del objeto window['lrw'].
-  widget_div_id: "usage-stats":
Nombre del div para insertar el widget, no debe ser modificado.

-  identifier: ""
Si conoce el identifier, puede colocarse directamente aqui.

- Configurar identifier_prefix, identifier_meta_field e identifier_regex

"oai identifier" es un identificador único utilizado en las solicitudes OAI-PMH para extraer los metadatos del ítem. La sintaxis de dicho identificador consta de tres partes:

    1. El esquema, seguido de dos puntos (:)
    2. El identificador de espacio de nombres, seguido de un slash (/)
    3. El identificador local.

El esquema es siempre "oai", el identificador de espacio de nombres es un nombre de dominio y el identificador local es una cadena de caracteres que identifica al elemento dentro del repositorio.

    Por ejemplo:
    ```
    oai:repositorio.utn.ac.cr:20.500.13077/403
    oai:bdigital.uexternado.edu.co:001/8734
    oai:digital.cic.gba.gob.ar:11746/6844
    ```
- El widget de estadísticas requiere de este identificador para recuperar los datos de vistas y descargas relacionados con un ítem específico, es necesario construirlo configurando las variables: identifier_prefix, identifier_meta_field y identifier_regex.

1. identifier_prefix: 

2. identifier_meta_field: 

3. identifier_regex: 

- Por ejemplo, un repositorio que utilice el servicio handle e identifique persistentemente sus ítems de la forma "https://hdl.handle.net/[prefijoHandle]/[consecutivoDelItem]", deberá construir una expresión regular con la cual extraer este último valor colocado en la meta-etiqueta "citation_abstract_url" tras el último slash ("/").

- Otro ejemplo posible es que el contenido del metadato dc.identifier.uri sea de la siguiente forma "https://[nombreDelRepositorio]/handle/[prefijoHandle]/[consecutivoDelItem]". De igual manera, el valor del parámetro identifier_regex debe consistir en una expresión regular que permita extraer de esta meta-etiqueta, los dígitos que proceden después del último slash ("/").
- 
Ejemplo de una configuracion completa:

Ejemplo de configuración completa:
```
{
    "lareferencia-widgets": {
        "lrw": {
            "active": true,
            "widget_url": "https://cdn.jsdelivr.net/gh/lareferencia/lrw@2.0.7/dist/lrw.js",    
                    
            "parameters":{
                "widget_div_id": "usage-
                "identifier_meta_field": "citation_abstract_html_url",
                "identifier_prefix": "oai:repositorio.utn.ac.cr:20.500.13077/",
                "identifier_regex": "https://hdl.handle.net/[0-9\\.]+/([0-9]+)/?",

                "scope_labels": {
                    "N": "Kímuk",
                    "R": "Repositorio UTN"
                },
                "country": "CR",
                "repository_source": "OPENDOAR::4680"
            }
        }
    }
}

```


