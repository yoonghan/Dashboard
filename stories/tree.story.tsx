import *as React from 'react';
import { storiesOf } from '@storybook/react';
import TreeStructure from '../src/components/TreeStructure';
import {MuiThemeProvider} from '@material-ui/core/styles';
import withTheme from '../src/hoc/withTheme';

const sampleTree = {
  module: 'react-ui-tree',
  children: [
    {
      module: 'dist',
      collapsed: false,
      children: [
        {
          module: 'node.js',
          leaf: true,
          key: '1'
        },
        {
          module: 'react-ui-tree.css',
          leaf: true,
          key: '1'
        },
        {
          module: 'react-ui-tree.js',
          leaf: true,
          key: '1'
        },
        {
          module: 'tree.js',
          leaf: true,
          key: '1'
        }
      ]
    },
    {
      module: 'example',
      children: [
        {
          module: 'app.js',
          leaf: true,
          key: '1'
        },
        {
          module: 'app.less',
          leaf: true,
          key: '1'
        },
        {
          module: 'index.html',
          leaf: true,
          key: '1'
        }
      ]
    },
    {
      module: 'lib',
      children: [
        {
          module: 'node.js',
          leaf: true,
          key: '1'
        },
        {
          module: 'react-ui-tree.js',
          leaf: true,
          key: '1'
        },
        {
          module: 'react-ui-tree.less',
          leaf: true,
          key: '1'
        },
        {
          module: 'tree.js',
          leaf: true,
          key: '1'
        }
      ]
    },
    {
      module: '.gitiignore',
      leaf: true,
      key: '1'
    },
    {
      module: 'index.js',
      leaf: true,
      key: '1'
    },
    {
      module: 'LICENSE',
      leaf: true,
      key: '1'
    },
    {
      module: 'Makefile',
      leaf: true,
      key: '1'
    },
    {
      module: 'package.json',
      leaf: true,
      key: '1'
    },
    {
      module: 'README.md',
      leaf: true,
      key: '1'
    },
    {
      module: 'webpack.config.js',
      leaf: true,
      key: '1'
    }
  ]
};

const TreeStructureTheme = withTheme(TreeStructure);

storiesOf('Tree Structure', module)
  .add('Collapsed Tree', () => (
    <TreeStructureTheme
      treeObject={sampleTree}
      isNodeCollapsed={false}
      callbackOnNodeClick={
          ()=>{console.log("CLICK")}
      }
      />
  ))
  ;
