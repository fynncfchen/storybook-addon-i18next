module.exports = {
  presets: [
    ['@babel/preset-env', {
      // shippedProposals: true,
      // useBuiltIns: 'usage',
      targets: {
        node: 'current',
      },
    }],
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-proposal-object-rest-spread',
  ],
};
