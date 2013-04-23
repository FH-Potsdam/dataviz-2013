D3 2.10 adds support for [tab-separated values](http://en.wikipedia.org/wiki/Tab-separated_values) via d3.tsv. Similar to the previous d3.csv method, this makes it easy to load and parse TSV files.

```javascript
d3.tsv("data.tsv", function(data) {
  console.log(data[0].x);
});
```
