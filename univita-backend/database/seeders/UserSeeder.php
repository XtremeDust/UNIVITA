<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Walas',
            'email' => 'walas.9519@unimar.edu.ve',
            'password' => Hash::make('walas2711'),
            'role' => 'admin', 
            'cedula' => 'V-30539519', 
            'telefono' => '04248090931',
            'email_verified_at' => now() 
        ]);

        $users = [
            ['name' => 'Wilmarys Brizuela', 'email' => 'w.brizuela@unimar.edu.ve', 'cedula' => 'V-16825747'],
            ['name' => 'Carlos Alas', 'email' => 'c.alas@unimar.edu.ve', 'cedula' => 'V-14542473'],
            ['name' => 'Flavio Rosales', 'email' => 'f.rosales@unimar.edu.ve', 'cedula' => 'V-20369518'],
            ['name' => 'Yemnel Torcal', 'email' => 'y.torcal@unimar.edu.ve', 'cedula' => 'V-20369517'],
            ['name' => 'Moises Gomez', 'email' => 'm.gomez@unimar.edu.ve', 'cedula' => 'V-27765432'],
            ['name' => 'Jorge Silva', 'email' => 'j.silva@unimar.edu.ve', 'cedula' => 'V-31246789'],
            ['name' => 'Samuel Marcano', 'email' => 's.marcano@unimar.edu.ve', 'cedula' => 'V-31565987'],
            ['name' => 'Angel Perez', 'email' => 'a.perez@unimar.edu.ve', 'cedula' => 'V-30549874'],
            ['name' => 'Abdl Taktak', 'email' => 'a.taktak@unimar.edu.ve', 'cedula' => 'V-25945779'],
            ['name' => 'Daniel Alarcon', 'email' => 'd.alarcon@unimar.edu.ve', 'cedula' => 'V-30145785'],
        ];

        foreach ($users as $userData) {
            User::create([
                'name' => $userData['name'],
                'email' => $userData['email'],
                'password' => Hash::make('12345678'), // Contraseña por defecto
                'role' => 'user',
                'cedula' => $userData['cedula'],
                'telefono' => '04120000000', // Teléfono de relleno
                'email_verified_at' => now()
            ]);
        }

    }
}
