let next = {splitChunks: {
    chunks: "all",
    minSize: 0,
    maxInitialRequests: 10,
    maxAsyncRequests: 10,
    cacheGroups: {
      vendors: {
        test: /[\\/]node_modules[\\/]/,
        name(module, chunks, cacheGroupKey) {
          const packageName = module.context.match(
            /[\\/]node_modules[\\/](.*?)([\\/]|$)/
          )[1];
          return `${cacheGroupKey}.${packageName.replace("@", "")}`;
        }
      },
      common: {
        minChunks: 2,
        priority: -10
      }
    }
  },
  runtimeChunk: "single"
}