

What if a somewhat verbose chart title could be used to generate a chart?

Imagine writing a chart title, and getting the chart that matches it. 

`Firefox 62 Release, US vs GB, MAUs`

`$AAPL, comparing closing price and market cap over time`

A grammar that parses this is hella simple.





////////////// Different approach above!



# unnamed parser project

In the fast-paced, high-stakes world of corporate operational dashboards, users stare incomprehensibly at a handful of graphs, fiddle with six or so dropdowns, and watch the graphs update, wondering if in fact this is what they wanted to look at in the first place. It takes them, like, a few minutes to make the dozen clicks to get the squiggle lines to have the labels they wanted to see in the first place. In one case, the dropdown labeled "COUNTRY" has - you guessed it - about one hundred countries, all by country code. _Damn it, is India ID or IN?_

The whole point of slapping on those little dropdown boxes was to keep the data engineer who made the dashboard from having to answer the marketing director's question for the same thing, only slightly different. The dropdowns, radio buttons, and checkboxes give you the same kind of _well that's good enough_ full-body high engineers love to chase. But really, they're telling the dashboard reader, _you must suffer as I have, making this thing in the first place. Tedium shall be your penance._

This repository comes from that imaginary Slack conversation between the director and the data engineer:

_DIRECTOR_: `hey Mike`

_ENGINEER_: `hi - what's up?`

_DIRECTOR_: `i'm looking at the campaign dashboard and i cant figure out how to look at things by country on the beta channels`

_DIRECTOR_: `im looking for the retention rates, just comparing usa britain and france, on the beta channel. does this dashboard have that`

_ENGINEER_: `Well, that's easy. If you select under METRIC there's "retention rate", and if you select each of those countries ffrom the check boxes, you'll see that you can actually drill down exactly the way you want.`

_DIRECTOR_: `ok, thx anyway`

The thing is, that director used natural language to describe something, and given the _context_ it's really not that vague. A dashboard should kind of understand enough of that natural language that, with a bit of nice UI magic, you should be able to just type `retention rates, comparing usa britain and france, on the beta channel`, and that translates into some simple operations.

That's what this repository is for - to try out this natural language parsing idea. I'm not claiming this is that novel an idea. Lots of websites have slightly-smarter forms. But this is a bit more complicated.

We're not re-implementing SQL. We're just trying to get the director of marketing off our backs.

## design assumptions

- a good parser needs a _grammar_ that is easy to understand, comprised of _fields_ (the fields that we expect to slide up, which can have factors or numerical values), and _operations_, which define how we go from token sets to generic operations.
- data scientists are used to slicing and dicing in the _field_ space. Libraries like `dplyr` allow you to group by a field, which means grouping together all the rows by field-value. But dashboard users don't always want that. Typically, they want to answer a question about a handful of values of a field, and are fine with the system sort of aggregating together all the other fields not mentioned. In some cases, they care about doing things just by field. But in general, they probably want to compare specific countries, or specific builds of some software, or specific products. 
<!-- - One problem is, even if you only have a couple fields, there may be way too many possible values to make users sift through. Let's make it easy to filter on the values that a user wants, or to compare certain values of a field. Consider a dashboard that allows you to filter by country, for example. Let's say I just want to filter out all countries that are not, for instance, `US, GB, DK, FR` - in this case, just give me the US, the UK, Germany, and France, and aggregate those. In this case, there's an inherent _filtering_ operation, and an _aggregation_ operation, rolled into one. After all, I'm only interested in those fields in my data. If I say, however, `US vs GB vs DK vs FR`, I'm expecting to _compare_ those four countries. I'd expect to see in this case four lines on a line chart, one per country that satisfies the rest of the grouping. So the first case should yield `{operation: 'take', values: ['US','GB','DK','FR']}`, while the second case should yield `{operation: 'compare', values: ['US','GB','DK','FR']}`. It shouldn't matter if I put commas between any of those input string values. They don't do anything. -->
- The values that make up a field should be unique across _all_ fields. By sticking to this, a user doesn't have to provide a key value pair to select field values. So instead of the SQL-esque `geo=US or geo=GB or geo=FR` you can just put in `US, GB, FR` and that will be semantically clear. This is, in fact, a bit closer to how natural language works - we usually understand within the context of what we're talking about when we say `give me the US, GB, and FR`.
- If you need even more complex queries, go back to SQL. Anything more complex than this is too complex for a dashboard user. these types of operations should really only be operating on vetted, tested data sets at any rate, and the act of subsetting and comparing the data is pretty much all we are doing here at any rate.
- The act of typing what you want turns the mind onto the thing. Too much typing, or having to learn how to type to get the thing, is destructive. Find out what "just enough typing" means.

## some challenges and thoughts form this experiment.

- _discoverability_ - users need a way to figure out what text they can enter into a system. One benefit of dropdowns is, you at least know what's available. Discoverability comes in a few flavors: (1) knowing what _fields_ are even available (and how to search through a field), (2) knowing what _values_ are available, (3) knowing what _operations_ are available on those field-values. One possibility would be to just type `HELP` or something into the field and it gives you a bunch of helpful information. Let's see how that goes.
- _what's the right resolution?_ - a system like this might work better if there are actually a lot of 