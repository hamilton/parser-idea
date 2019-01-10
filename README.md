# parser

This is an experiment with removing the need for endless dropdowns and small input fields in dashboards, replacing everything with _one_ input and a natural way to achieve the same sort of drilling-down.

Many operational dashboards tend to have a number of graphs on them, as well as some controls to drill down, filter, and compare the data in certain ways. The goal is to give the user ways of getting the answer they care about without having to bother a data scientist or data engineer to run a new query. Certainly a noble goal.

In reality, however, makers of dashboards tend to make the drilling-down tools cumbersome. A user may encounter a small militia of dropdowns or a vast sea of checkboxes, which can be overwhelming, especially when a user already knows how they want to do something and doesn't want to click a dozen times to get a trend line. Dashboard makers aren't _trying_ to make things difficult - these input elements are the ones that come with the browser, so they seem the most natural to use.

So Parser is meant to make drilling down an operation dashboard a little easier, merely by allowing the user to just type in a more natural language rather than clicking through dropdowns and form elements.

## design assumptions

- To reiterate, many operational and product dashboards have too many available drill-down fields, and for many fields, there are simply too many options for a user to sift through in a dropdown. Yet giving a breadth of options for segmenting a data set may still be necessary.
- In cases where there are just far too many values in a field, make it easy to filter on the values that a user wants, or to compare certain values of a field. Let's consider a dashboard that allows you to filter by country, for example. Let's say I just want to filter out all countries that are not, for instance, `US, GB, DK, FR` - in this case, just give me the US, the UK, Germany, and France, and aggregate those. In this case, there's an inherent _filtering_ operation, and an _aggregation_ operation, rolled into one. After all, I'm only interested in those fields in my data. If I say, however, `US vs GB vs DK vs FR`, I'm expecting to _compare_ those four countries. I'd expect to see in this case four lines on a line chart, one per country that satisfies the rest of the grouping.
- The parser itself needs to get fed _nouns_ and _verbs_. You have to keep it simple, however. `vs` is one form of comparison verb, that takes the left value and the right value. `Comparing USA, UK, and FR` could be another way of doing it. In both cases, a small amount of tokenization and reading goes a long way. https://towardsdatascience.com/a-practitioners-guide-to-natural-language-processing-part-i-processing-understanding-text-9f4abfd13e72
- The values of a field should be unique across _all_ fields. By sticking to this, a user doesn't have to provide a key value pair to select field values. So instead of the SQL-esque `geo=US or geo=GB or geo=FR` you can just put in `US, GB, FR` and that will be semantically clear. This is, in fact, a bit closer to how natural language works - we usually understand within the context of what we're talking about when we say `give me the US, GB, and FR`. A dashboard should, in theory, also provide enough context.
- If you need even more complex queries, go back to SQL. This is meant to reduce cognitive load, not increase it.

## some examples

Let's say we have the following fields: `product=Messenger,Instagram,Whatsapp,Facebook`, `country=USA,UK,Germany,India,China`, `channel=Beta,Release`, `funnel=Invite,Organic`, and `metrics=mau,retention,bounce-rate`. {I see a problem with this appraoch. human language is hard.}

- `Indonesia, mau, retention, Messenger vs. Whatsapp` -> in India, compare MAUs and retention for Messenger and Whatsapp. The manifest generated from the query may also include the default channel (`Release`) as well.
- `Instagram, Germany vs. UK vs USA, Invite, `

Contrived examples are difficult. I'm thinking of specific cases at Mozilla, and it seems pretty obivous which fields would be valuable and known to everyone.

