<!DOCTYPE html>

<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js" defer></script>

<section class="px-6 py-8">
    <main class="max-w-lg mx-auto mt-10 bg-blue-100 border border-blue-300 p-6 rounded-xl">
        <h1 class="text-center font-bold text-xl">Registrarse!</h1>
        <form class="form-group" method="POST" action="/" class="mt-10" enctype="multipart/form-data">
            @csrf

            <div class="text-center">
                <label class="block mb-2 text-xs font-bold text-gray-700 uppercase" for="nom">
                    Nombre
                </label>
                <input class="w-full p-2 border border-blue-400 rounded" type="text" name="nom"
                    value="{{ old('nom') }}" required>
                @error('nom')
                    <p class=" text-red-500 text-xs mt-2">{{ $message }}</p>
                @enderror
            </div>

            <div class="mt-6 text-center">
                <label class="block mb-2 text-xs font-bold text-gray-700 uppercase" for="ced">
                    Cedula
                </label>
                <input class="w-full p-2 border border-blue-400 rounded" type="text" name="ced"
                    value="{{ old('ced') }}" required>
                @error('ced')
                    <p class="text-red-500 text-xs mt-2">{{ $message }}</p>
                @enderror
            </div>

            <div class="mt-6 text-center">
                <label class="block mb-2 text-xs font-bold text-gray-700 uppercase" for="num">
                    Telefono
                </label>
                <input class="w-full p-2 border border-blue-400 rounded" type="text" name="num"
                    value="{{ old('num') }}" required>

                @error('num')
                    <p class="text-red-500 text-xs mt-2">{{ $message }}</p>
                @enderror
            </div>

            <div class="mt-6 text-center">
                <label class="block mb-2 text-xs font-bold text-gray-700 uppercase" for="cor">
                    Correo
                </label>
                <input class="w-full p-2 border border-blue-400 rounded" type="cor" name="cor"
                    value="{{ old('cor') }}" required>
                @error('cor')
                    <p class="text-red-500 text-xs mt-2">{{ $message }}</p>
                @enderror
            </div>

            <div class="mt-6 text-center">
                <label class="block mb-2 text-xs font-bold text-gray-700 uppercase" for="dir">
                    Dirreccion
                </label>
                <input class="w-full p-2 border border-blue-400 rounded" type="dir" name="dir"
                    value="{{ old('dir') }}" required>
                @error('dir')
                    <p class="text-red-500 text-xs mt-2">{{ $message }}</p>
                @enderror
            </div>

            <div class="mt-6 text-center">
                <label class="block mb-2 text-xs font-bold text-gray-700 uppercase" for="fec_nac">
                    Fecha nacimiento
                </label>
                <input class="w-full p-2 border border-blue-400 rounded" type="fec_nac" name="fec_nac"
                    value="{{ old('fec_nac') }}" required>
                @error('fec_nac')
                    <p class="text-red-500 text-xs mt-2">{{ $message }}</p>
                @enderror
            </div>

            {{-- <div class="mb-6">
                    <label class="block mb-2 text-xs font-bold text-gray-700 uppercase" for="fot_per">
                        Foto perfil
                    </label>
                    <input class="w-full p-2 border border-blue-400 rounded" type="fot_per" name="fot_per"
                        id="fot_per">
                    @error('fot_per')
                        <p class="text-red-500 text-xs mt-2">{{ $message }}</p>
                    @enderror
                </div> --}}


                <div class="mt-6 text-center">
                    <label class="block mb-2 text-xs font-bold text-gray-700 uppercase" for="">
                        Foto perfil
                    </label>
                    <input type="file" name="fot_per">
                    @error('fot_per')
                            <div class="alert alert-danger mt-1 mb-1">{{ $message }}</div>
                    @enderror
                </div>




            <div class="mb-6 text-center">
                <button type="submit" class="bg-gray-400 text-white rounded py-2 px-4 hover:bg-gray-500">
                    Enviar
                </button>
            </div>

            {{-- @if ($error->any())
                    <ul>
                        @foreach ($errors->all() as $error)
                            <li class="text-red-500 text-xs mt-2">{{ $error }}</li>
                        @endforeach
                    </ul>
                @endif --}}
        </form>
    </main>
</section>

</html>
