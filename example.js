import React, {Component} from 'react'
import {render} from 'react-dom'
import matchSorter from 'match-sorter'
import starWarsNames from 'starwars-names'
import Downshift from 'downshift'
import {
  Label,
  Menu,
  ControllerButton,
  Input,
  Item,
  ArrowIcon,
  XIcon,
  css,
} from './shared'

class App extends React.Component {
  allItems = starWarsNames.all.map(s => ({name: s, id: s.toLowerCase()}))
  state = {items: this.allItems}
  handleStateChange = (changes, downshiftState) => {
    if (changes.hasOwnProperty('inputValue')) {
      this.setState({items: this.getItems(changes.inputValue)})
    }
    // handle stuff here if you need to
    // this is especially useful if you need
    // to controll some of the internal state yourself
  }
  handleChange = (selectedItem, downshiftState) => {
    this.setState({items: this.allItems})
    // handle the new selectedItem here
  }
  getItems = value => {
    return value
      ? matchSorter(this.allItems, value, {
          keys: ['name'],
        })
      : this.allItems
  }
  itemToString(i) {
    return i ? i.name : ''
  }
  render() {
    const {items} = this.state
    return (
      <div
        {...css({
          display: 'flex',
          flexDirection: 'column',
          marginTop: 50,
        })}
      >
        <Downshift itemToString={this.itemToString}>
          {({
            getLabelProps,
            getInputProps,
            getToggleButtonProps,
            getItemProps,
            isOpen,
            toggleMenu,
            clearSelection,
            selectedItem,
            inputValue,
            highlightedIndex,
          }) => (
            <div {...css({width: 250, margin: 'auto'})}>
              <Label {...getLabelProps()}>Find a Star Wars character</Label>
              <div {...css({position: 'relative'})}>
                <Input
                  {...getInputProps({
                    isOpen,
                    placeholder: 'Enter a name',
                  })}
                />
                {selectedItem ? (
                  <ControllerButton
                    onClick={clearSelection}
                    aria-label="clear selection"
                  >
                    <XIcon />
                  </ControllerButton>
                ) : (
                  <ControllerButton {...getToggleButtonProps()}>
                    <ArrowIcon isOpen={isOpen} />
                  </ControllerButton>
                )}
              </div>
              <div {...css({position: 'relative'})}>
                {!isOpen ? null : (
                  <Menu>
                    {items.map((item, index) => (
                      <Item
                        key={item.id}
                        {...getItemProps({
                          item,
                          index,
                          isActive: highlightedIndex === index,
                          isSelected: selectedItem === item,
                        })}
                      >
                        {this.itemToString(item)}
                      </Item>
                    ))}
                  </Menu>
                )}
              </div>
            </div>
          )}
        </Downshift>
      </div>
    )
  }
}

render(<App />, document.getElementById('root'))
