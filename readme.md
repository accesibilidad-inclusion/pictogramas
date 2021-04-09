# Pictogramas

**Pictogramas** es una librería de software y un sistema gráfico diseñado para componer pictogramas que apoyan la accesibilidad cognitiva en servicios públicos. 

**Pictogramas** permite explicar de forma visual el paso-a-paso de las transacciones en los servicios. Esta librería es utilizada por **[Pictos](http://www.pictos.cl)** y se disponibiliza al público de forma gratuita y abierta para la elaboración de apoyos visuales y señalética accesible en espacios y servicios públicos.

<a href="https://liberapay.com/accesibilidad-inclusion/donate"><img alt="Donate using Liberapay" src="https://liberapay.com/assets/widgets/donate.svg"></a>


### Sistema gráfico
Este sistema permite crear **Pictogramas** a partir de la articulación de 3 elementos o *capas* gráficas. Este pictograma ilustra el paso, de una serie de pasos que constituyen una tarea. PICTOS ayuda a volver más accesibles las tareas de los servicios públicos, sus transacciones. 

Las capas de cada paso o pictograma:

1. **Capa superior:** Acciones del protagonista: *verbo*
2. **Capa media:** Artefactos y elementos: *objeto sustantivo* con el cual se interactúa
3. **Capa contextual:** Espacio y referentes: razgo icónico en su sentido tipológico-situacional

Para que un servicio pueda ser accesible primero necesitamos saber qué cosas podemos hacer en él (las tareas o transacciones disponibles) y cuáles son los pasos para cada una de ellas. **Pictogramas** está diseñado para constuir los apoyos visuales para estos pasos y pueden ser utilizados como señalética *in-situ* o por medio de la aplicación **[Pictos](http://www.pictos.cl)**.

Este sistema contiene una colección de posibilidades para cada una de las capas, lo que permite una combinatoria muy amplia de pictogramas que buscamos aumentar gracias al apoyo de la comunidad.

##### Estructura

``` JSON
{
  "layer": 1,
  "path": "foobar.svg",
  "label": "lorem ipsum dolor sit amet",
  "type": "action|object|context",
  "tags": [ "foo", "bar", "quick brwn fox"]
}
```

#### Créditos

Este proyecto es fruto del trabajo de muchas personas y el apoyo de diversas iniciativas:

##### Autores
Pictogramas (inicialmente "PICTOS") fue el proyecto de Titulación de Diseño Gráfico de Antonella Pastén y María Ignacia von Unger. Profesores Herbert Spencer, Katherine Exss y Vanessa Vega. e[ad] Escuela de Arquitectura y Diseño PUCV. Este proyecto sigue en crecimiento y es mantenido por el [Núcleo de Investigación en Accesibilidad e Inclusión PUCV](http://www.accesibilidad-inclusion.cl).

##### Instituciones

1. **Pontificia Universidad Católica de Valparaíso** mediante los proyectos:
  - I2: Investigación Inclusiva: Oportunidades para fortalecer la autodeterminación en la era digital (2017)
  -  I3: Investigación, Innovación e Inclusión en la PUCV (2018)
2. **Servicio Nacional de la Discapacidad, SENADIS**
  - Apoyos Visuales para la Plena Inclusión de las Personas con Discapacidad Intelectual en los Servicios Públicos en Chile (2019-2020)

| ![Pontificia Universidad Caólica de Valparaíso](logos/logo-pucv.gif) | ![SENADIS](logos/logo-senadis.gif) | ![Cultura Libre](logos/logo-cultura-libre.gif) | ![Código Abierto](logos/logo-opensource.gif) |
|----------------------------------------------------------------------|------------------------------------|------------------------------------------------|----------------------------------------------|
