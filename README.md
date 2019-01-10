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

- One problem is, even if you only have a couple fields, there may be way too many possible values to make users sift through. Let's make it easy to filter on the values that a user wants, or to compare certain values of a field. Consider a dashboard that allows you to filter by country, for example. Let's say I just want to filter out all countries that are not, for instance, `US, GB, DK, FR` - in this case, just give me the US, the UK, Germany, and France, and aggregate those. In this case, there's an inherent _filtering_ operation, and an _aggregation_ operation, rolled into one. After all, I'm only interested in those fields in my data. If I say, however, `US vs GB vs DK vs FR`, I'm expecting to _compare_ those four countries. I'd expect to see in this case four lines on a line chart, one per country that satisfies the rest of the grouping. So the first case should yield `{operation: 'take', values: ['US','GB','DK','FR']}`, while the second case should yield `{operation: 'compare', values: ['US','GB','DK','FR']}`. It shouldn't matter if I put commas between any of those input string values. They don't do anything.
- any parser needs a _grammar_ that is easy to understand, comprised of _fields_ (the fields that we expect to slide up, which can have factors or numerical values), and _operations_, which define how we go from token sets to generic operations. We've already basically introduced two types of operations = `take` and `compare`, and (implicitly) one field - `country`.
- The values that make up a field should be unique across _all_ fields. By sticking to this, a user doesn't have to provide a key value pair to select field values. So instead of the SQL-esque `geo=US or geo=GB or geo=FR` you can just put in `US, GB, FR` and that will be semantically clear. This is, in fact, a bit closer to how natural language works - we usually understand within the context of what we're talking about when we say `give me the US, GB, and FR`.
- If you need even more complex queries, go back to SQL. Anything more complex than this is too complex for a dashboard user. these types of operations should really only be operating on vetted, tested data sets at any rate, and the act of subsetting and comparing the data is pretty much all we are doing here at any rate.

## some examples

Let's say we have the following fields: `product=Messenger,Instagram,Whatsapp,Facebook`, `country=USA,UK,Germany,India,China`, `channel=Beta,Release`, `funnel=Invite,Organic`, and `metrics=mau,retention,bounce-rate`. {I see a problem with this appraoch. human language is hard.}

- `Indonesia, mau, retention, Messenger vs. Whatsapp` -> in India, compare MAUs and retention for Messenger and Whatsapp. The manifest generated from the query may also include the default channel (`Release`) as well.
- `Instagram, Germany vs. UK vs USA, Invite, `

Contrived examples are difficult. I'm thinking of specific cases at Mozilla, and it seems pretty obivous which fields would be valuable and known to everyone.

