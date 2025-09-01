module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env', // Asegúrate de que usas este nombre para acceder a las variables
        path: '.env', // Ruta al archivo .env en la raíz del proyecto
        safe: false, // Permite que las variables no definidas en .env no lancen errores
        allowUndefined: true, // Permite variables indefinidas en tu código
      },
    ],
  ],
};
