# Lösung
## Im `<head>`
```html
<style>
    .highlight {
        background-color: green;
        color: white;
    }

    .meine-stadt {
        border: 2px solid red;
    }
</style>
```

## Im `<body>`
```html
<table id="benzinpreis-tabelle">
    <tr>
        <th id="th_1_1">Stadt</th>
        <th id="th_1_2">Super E10</th>
        <th id="th_1_3">Diesel</th>
    </tr>
    <tr>
        <td id="td_2_1">Berlin</td>
        <td id="td_2_2">2,087</td>
        <td id="td_2_3">1,972</td>
    </tr>
    <tr>
        <td id="td_3_1">Esslingen</td>
        <td id="td_3_2">2,014</td>
        <td id="td_3_3" class="highlight">1,932</td>
    </tr>
    <tr>
        <td id="td_4_1" class="meine-stadt">Nürtingen</td>
        <td id="td_4_2" class="meine-stadt highlight">1,979</td>
        <td id="td_4_3" class="meine-stadt">1,899</td>
    </tr>
</table>
```