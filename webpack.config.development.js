import { merge } from 'webpack-merge';
import common from './webpack.config.common.js';

export default merge(common, {
  mode: 'development',
  devtool: 'source-map',
  optimization: {
    minimize: false,
  },
});