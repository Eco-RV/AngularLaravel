<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Factura</title>
    <style>
        h1 {
            font-size: 18;
            text-align: center;
            font-style: bold;
        }

        p {
            font-size: 14;
            text-align: left;
        }

        table,
        th,
        td {
            border: 1px solid black;
            border-collapse: collapse;
        }

    </style>
</head>

<body>
    <h1>La Ficticia</h1>
    <p>Numero de Factura: {{ $num_fac }}</p>
    <p>Cliente: {{ $nom_clie }}</p>
    <p>Dirección: {{ $dir_clie }}</p>

    <table style="width:100%">
        <tr>
            <th>Cantidad</th>
            <th>Descripcion</th>
            <th>Precio Unitario</th>
            <th>SubTotal</th>
        </tr>

        @foreach ($desgloses as $desg)
            <tr>
                <td style="text-align: center">{{ $desg->cantidad }}</td>
                <td style="text-align: center">{{ $desg->producto->nom }}</td>
                <td style="text-align: right">{{ $desg->producto->pre_uni }}</td>
                <td style="text-align: right">{{ $desg->pre_tot }}</td>
            </tr>
        @endforeach

        <tr>
            <td style="text-align: center"> - </td>
            <td style="text-align: center"> - </td>
            <td style="text-align: center"> - </td>
            <td style="text-align: center"> - </td>
        </tr>

        <tr>
            <td></td>
            <td></td>
            <td style="text-align: center">Precio Total:</td>
            <td style="text-align: right">{{ $pre_tot }}</td>
        </tr>

    </table>

</body>

</html>
