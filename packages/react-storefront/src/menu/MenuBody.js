/**
 * @license
 * Copyright © 2017-2019 Moov Corporation.  All rights reserved.
 */
import React, { Component, Fragment } from 'react'
import ListItemText from '@material-ui/core/ListItemText'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Item from './Item'
import MenuContext from './MenuContext'

export default class MenuBody extends Component {
  static contextType = MenuContext

  render() {
    const { classes, rootHeader, rootFooter, drawerWidth, root, path, depth } = this.props

    const parentPath = path.length ? '@' + path.slice(0, path.length - 1).join(',') : null

    const id = '@' + path.join(',')

    const isRoot = id === '@'

    const header = !isRoot && (
      <MenuItem divider button on={`tap:AMP.setState({ list: '${parentPath}' })`}>
        <ListItemIcon classes={{ root: classes.header }}>
          <ChevronLeft className={classes.icon} />
        </ListItemIcon>
        <ListItemText
          classes={{ root: classes.headerText }}
          primary={<div className={classes.headerText}>{root.text} </div>}
        />
      </MenuItem>
    )

    return (
      <div
        className={isRoot ? '' : classes.hidden}
        amp-bind={`class=>list == '${id}'  ? '${classes.visible}' : '${classes.hidden}'`}
      >
        <MenuList classes={{ padding: classes.list }}>
          {rootHeader}
          {header}
          {root.items.map((item, i) => (
            <Fragment>
              <Item {...this.props} depth={depth} item={item} key={i} index={i} />
            </Fragment>
          ))}
          {rootFooter}
        </MenuList>
      </div>
    )
  }
}
