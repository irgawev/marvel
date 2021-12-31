import { useState, useEffect, useRef } from 'react';
import { PropTypes } from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

const CharList = props => {
  const [charList, setCharList] = useState([])
  const [newItemLodaing, setNewItemLodaing] = useState(false)
  const [offset, setOffset] = useState(210)
  const [charEnded, setCharEnded] = useState(false)

  const { loading, error, getAllCharacters } = useMarvelService();

  useEffect(() => {
    onRequest(offset, true)
  }, [])

  const onRequest = (offset, initial) => {
    initial ? setNewItemLodaing(false) : setNewItemLodaing(true)
    getAllCharacters(offset)
      .then(onCharListLoaded)
  }

  const onCharListLoaded = (newCharList) => {
    let ended = false

    if (newCharList.length < 9) {
      ended = true
    }

    setCharList(charlist => [...charList, ...newCharList])
    setNewItemLodaing(newItemLodaing => false)
    setOffset(offset => offset + 9)
    setCharEnded(charEnded => ended)
  }

  const itemRefs = useRef([])

  const focusOnItem = id => {
    itemRefs.current.forEach(item => item.classList.remove('char__item_selected'))
    itemRefs.current[id].classList.add('char__item_selected')
    itemRefs.current[id].focus()
  }

  function renderItems(arr) {
    const items = arr.map((item, i) => {
      let imgStyle = { 'objectFit': 'cover' };

      if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = { 'objectFit': 'unset' };
      }

      return (
        <li
          className="char__item"
          key={item.id}
          ref={el => itemRefs.current[i] = el}
          tabIndex="0"
          onClick={() => {
            props.onCharSelected(item.id)
            focusOnItem(i)
          }}
          onKeyPress={(e) => {
            if (e.key === ' ' || e.key === 'Enter') {
              props.onCharSelected(item.id)
              focusOnItem(i)
            }
          }}>
          <img src={item.thumbnail} alt={item.name} style={imgStyle} />
          <div className="char__name">{item.name}</div>
        </li>
      )
    });
    // А эта конструкция вынесена для центровки спиннера/ошибки
    return (
      <ul className="char__grid">
        {items}
      </ul>
    )
  }

  const items = renderItems(charList);
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading && !newItemLodaing ? <Spinner /> : null;

  return (
    <div className="char__list">
      {errorMessage}
      {spinner}
      {items}
      <button
        className="button button__main button__long"
        disabled={newItemLodaing}
        style={{ 'display': charEnded ? 'none' : 'block' }}
        onClick={() => onRequest(offset)}>
        <div className="inner">load more</div>
      </button>
    </div>
  )
}

CharList.propTypes = {
  onCharSelected: PropTypes.func
}

export default CharList;