# unnamed parser project

In the fast-paced, high-stakes world of corporate operational dashboards, users stare incomprehensibly at a handful of graphs, fiddle with six or so dropdowns, and watch the graphs update after the little "waiting" gear animation turns on their screen - just enough time for their eyes to glaze over. On the path to The Thing They Want, they spend, like, a few minutes clicking a dozen times on those lightly-styled UI widgets to get the squiggle lines to have the labels they wanted to see in the first place. In one case, the dropdown labeled "COUNTRY" has - you guessed it - about one hundred countries, all by country code. _Damn it, I can never remember  - is India ID or IN?_

The whole point of slapping on those little dropdown boxes was to keep the data engineer who made the dashboard from having to answer the marketing director's question for the same thing, only slightly different. The dropdowns, radio buttons, and checkboxes basically come with every browser, and they give you the same kind of _well that's good enough_ full-body high engineers love to chase. But really, to the dashboard reader, the dashboard UX succinctly translates as _you must suffer as I have, making this thing in the first place. Tedium shall be your penance._ 

So let's try a little experiment. Here are my assumptions:

1. the people reading a dashboard can often say what they want in plain, concise language.
2. that plain language, at its best, more or less resembles all the metadata for a chart - the title, the fields, the time horizon, the units (if not obvious), etc. And for the things they leave out, there are probably some implicit operations (aggregation across the non-important fields).
3. we can build a parser that essentially takes a short human description and  generates a chart out of it. The act of typing what one wants turns on the mind better than a thousand dropdown clicks.
4. we can build an interface that gives a user instant feedback on what they're typing and gives easy ways to correct themselves & discover fields and operations.
4. this tiny language can be translated into a grammar of data manipulation.
5. this parser cannot be allowed to grow in complexity. If it can do more than just slap together simple operations to make a chart appear, then we've probably already gone too.

It could look something like this:

![jan-11-2019 15-47-37](https://user-images.githubusercontent.com/95735/51126405-e510c600-17d7-11e9-8ba1-9c4e347720af.gif)


## design assumptions, for the eggheads out there

- a good parser needs a _grammar_ to make sense of the strings. To compose the grammar, you need _fields_ - countries, channels, products, etc., which typically have a bunch of values associated with them. You also need _operations_ - ways of creating operations using the fields. In our example above, `vs` should look at the tokens around it to figure out what you're comparing.
- the grammar needs to track like natural language, and be forgiving as hell, but not more forgiving than natural language. If I say `Firefox 60 nightly, total downloads` (sorry, as of this doc I'm working at Mozilla and that's kind of what's motivating this) it should be the same as saying `Firefox, 60, nightly, total downloads` or something like that.
- the grammar is not SQL! It will never be a SQL! It can only operate on the _context_ in which it is used. In our case, a dashboard.
- don't make users sift through every field value. Users usually know what they want to see. Typing out the values they want is usually enough.
- every field value _must_ be unique across all fields. `USA` should only be applicable to one field.


## some challenges and thoughts form this experiment.

- _discoverability_ - users need a way to figure out what text they can enter into a system. One benefit of dropdowns is, you at least know what's available. Discoverability comes in a few flavors: (1) knowing what _fields_ are even available (and how to search through a field), (2) knowing what _values_ are available, (3) knowing what _operations_ are available on those field-values. One possibility would be to just type `HELP` or something into the field and it gives you a bunch of helpful information. Another would be to provide some form of autocomplete / suggestions.
