# Lösung
```html
<style id="meinStyle">
ul {
list-style-type: none;
width: 200px;
background-color: #000;
}

li > a {
display: block;
color: #fff;
text-decoration: none;
}

li > a:hover {
background-color: #fff;
color: #000;
}
</style>
[...]
<!-- Änderungen im Body ab hier einfügen -->
<ul>
<li><a href="#">Home</a></li>
<li><a href="#">News</a></li>
<li><a href="#">Contact</a></li>
<li><a href="#">About</a></li>
</ul> 
```