import React, {useState, useEffect,useMemo} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
  Alert,
} from 'react-native';
import {Text, Searchbar} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import Button from '../component/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS,SIZES, images} from '../constants';
import {useSelector, useDispatch} from 'react-redux';
import {AllBooks, AllBooksViewData, AllBooksHistory} from '../redux/selectors'
import { viewBook } from '../redux/actions/bookAction';

const Books = ({navigation}) => {
  const dispatch = useDispatch();
    const books = useSelector(AllBooks);
    const booksViewData = useSelector(AllBooksViewData);
    const booksHistory = useSelector(AllBooksHistory);
    const [filterList, setFilterList] = useState([]);
    const booksView = useMemo(() => books.slice(), [books]);
    const handleView = async (item)=>{
        navigation.push("BookDetail",item)
        if (booksHistory.find(book => book.bookID===item._id)===undefined){
            console.log('hahaha')
            const result = await dispatch(viewBook(item._id));
        }
    }
    //Set data view, like
    useEffect(()=>{
        booksView.map( item =>{
            item.view = booksViewData.filter(x => x.bookID === item._id)[0].view;
            item.like = booksViewData.filter(x => x.bookID === item._id)[0].like;
        })
    },[books,booksViewData])
    
    //BookList: all book data
    const [booksList, setBooksList] = useState([]);
    useEffect(()=>{
        setBooksList(booksView);
    },[books,booksViewData]) 
  const [selectedValue, setSelectedValue] = useState('ALL');
  const [startValue, setStartValue] = useState('None');
  useEffect(() => {
    let data = booksList.slice();
    let newData = []; 
    if (selectedValue == 'ALL') {
      newData = data;
    }
    if (selectedValue == 'NOVEL') {
      newData = data.filter(item => {
        if (item.Type == 'NOVEL') {
          return item;
        }
      });
    }
    if (selectedValue == 'SELFHELPS') {
      newData = data.filter(item => {
        if (item.Type == 'SELF HELPS') {
          return item;
        }
      });
    }
    if (selectedValue == 'CHILDREN') {
      newData = data.filter(item => {
        if (item.Type.indexOf('CHILDREN') >= 0) {
          return item;
        }
      });
    }
    if (selectedValue == 'WORKSSTYLE') {
      newData = data.filter(item => {
        if (item.Type == 'WORKS STYLE') {
          return item;
        }
      });
    }
    if (selectedValue == 'SCIENCE') {
      newData = data.filter(item => {
        if (item.Type == 'SCIENCE') {
          return item;
        }
      });
    }
    if (selectedValue == 'OTHERS') {
      newData = data.filter(item => {
        if (item.Type == 'OTHERS') {
          return item;
        }
      });
    }
    if (startValue == 'A') {
        newData.sort((a, b) => a.Title>=b.Title
      );
    }
    if (startValue == 'Z') {
       newData.sort((a, b) => a.Title<b.Title
      );
    }
    setFilterList(newData);
  }, [booksList, selectedValue, startValue]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);
  const [resultData, setResultData] = React.useState('');
  const [typeSearch, setTypeSearch] = React.useState('All');
  useEffect(() => {
    let index = -1;
    let newData;
    if (typeSearch == 'All') {
      newData = booksList.filter(book => {
        index = book.Title.toLowerCase().indexOf(searchQuery.toLowerCase());
        if (index > -1) {
          return book;
        }
        index = book.Author.toLowerCase().indexOf(searchQuery.toLowerCase());
        if (index > -1) {
          return book;
        }
      });
    }
    if (typeSearch == 'Title') {
      newData = booksList.filter(book => {
        index = book.Title.indexOf(searchQuery);
        if (index > -1) {
          return book;
        }
      });
    }
    if (typeSearch == 'Author') {
      newData = booksList.filter(book => {
        index = book.Author.indexOf(searchQuery);
        if (index > -1) {
          return book;
        }
      });
    }
    newData = newData.sort((a, b) =>
      a.Title.toLowerCase() < b.Title.toLowerCase() ? 1 : -1,
    );
    setResultData(newData);
  }, [booksList, searchQuery, typeSearch]);
  return (
    <SafeAreaView>
      <Searchbar
        placeholder="Search Here..."
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      {searchQuery.length != 0 ? (
        <View>
          <View>
            <Picker
              selectedValue={typeSearch}
              style={{height: 50, width: 160}}
              mode="dropdown"
              onValueChange={(itemValue, itemIndex) =>
                setTypeSearch(itemValue)
              }>
              <Picker.Item label="All" value="All" />
              <Picker.Item label="Title" value="Title" />
              <Picker.Item label="Author" value="Author" />
            </Picker>
          </View>
          {resultData.length === 0 ? (
            <View style={styles.noResult}>
              <Text style={styles.textNoResult}>No Result</Text>
            </View>
          ) : (
            <View>
              <FlatList
                style={{height: SIZES.height-150}}
                data={resultData}
                renderItem={({item}) => (
                  <View style={styles.Book}>
                    <TouchableOpacity
                      style={styles.btnImg}
                      onPress={() => navigation.push("BookDetail",item)}>
                      <Image style={styles.img} source={item.ImageURL===""? images.theTinyDragon:{uri: item.ImageURL}} />
                    </TouchableOpacity>
                    <View style={styles.infoBook}>
                      <View style={styles.childInfo}>
                        <Text style={styles.title} numberOfLines={2}>{item.Title}</Text>
                        <Text style={styles.author}>{item.Author}</Text>
                      </View>
                    </View>
                  </View>
                )}
              />
            </View>
          )}
        </View>
      ) : (
        <View>
          <View style={styles.picker}>
            <Picker
              selectedValue={selectedValue}
              style={{height: 50, width: 160}}
              mode="dropdown"
              onValueChange={(itemValue, itemIndex) =>
                setSelectedValue(itemValue)
              }>
              <Picker.Item label="All" value="ALL" />
              <Picker.Item label="Novel" value="NOVEL" />
              <Picker.Item label="Self Helps" value="SELF HELPS" />
              <Picker.Item label="Children's Book" value="CHILDREN" />
              <Picker.Item label="Works Style" value="WORKS STYLE" />
              <Picker.Item label="Science" value="SCIENCE" />
              <Picker.Item label="Others" value="OTHERS" />
            </Picker>
            <Picker
              selectedValue={startValue}
              style={{height: 50, width: 160}}
              mode="dropdown"
              onValueChange={(itemValue, itemIndex) =>
                setStartValue(itemValue)
              }>
              <Picker.Item label="-None-" value="None" />
              <Picker.Item label="A-Z" value="A" />
              <Picker.Item label="Z-A" value="Z" />
            </Picker>
          </View>
          <View>
            {booksList.length === 0 ? (
              <FlatList
                data={[...Array(3).keys()]}
                renderItem={({item}) => <View style={styles.waitIMG} />}
              />
            ) : (
              <FlatList
                style={{height: SIZES.height-150}}
                data={filterList}
                renderItem={({item}) => (
                  <View style={styles.Book}>
                    <TouchableOpacity
                      style={styles.btnImg}
                      onPress={() => navigation.push("BookDetail",item)}>
                      <Image style={styles.img} source={item.ImageURL===""? images.theTinyDragon:{uri: item.ImageURL}} />
                    </TouchableOpacity>
                    <View style={styles.infoBook}>
                      <View style={styles.childInfo}>
                        <Text style={styles.title} numberOfLines={2}>{item.Title}</Text>
                        <Text style={styles.author}>{item.Author}</Text>
                        <Text style={styles.type}>{item.Type}</Text>
                        {(item.PDF != '') & (item.Audio != '') ? (
                          <Text>PDF | Audio</Text>
                        ) : item.PDF != '' ? (
                          <Text>PDF</Text>
                        ) : (
                          <Text>Audio</Text>
                        )}
                        <View style={styles.viewLike}>
                          <View style={{alignItems: "center", justifyContent: 'center', flexDirection: 'row'}}>
                            <Ionicons
                              name="eye-outline"
                              size={21}
                              color={COLORS.button}
                            />
                            <Text style={{color: COLORS.button}}>{item.view}</Text>
                          </View>
                          <View style={{alignItems: "center", justifyContent: 'center', flexDirection: 'row'}}>
                            <Ionicons
                              name="heart-circle-outline"
                              size={21}
                              color={COLORS.love}
                            />
                            <Text  style={{color: COLORS.love}}>{item.like}</Text>
                          </View>
                        </View>
                      </View>
                      <View style={styles.btnView}>
                        <Button
                          mode="contained"
                          onPress={() => navigation.push("BookDetail",item)}
                          style={styles.save}>
                          <Ionicons
                            name="eye-outline"
                            size={21}
                            color="white"
                          />
                        </Button>
                        <Button
                          mode="contained"
                          onPress={() => Alert.alert('Save Book')}
                          style={styles.save}>
                          <Ionicons
                            name="bookmark-outline"
                            size={21}
                            color="white"
                          />
                        </Button>
                      </View>
                    </View>
                  </View>
                )}
              />
            )}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Book: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gainsboro,
    borderRadius: 10,
    borderColor: COLORS.borColor,
    borderWidth: 1,
    margin: 10,
  },
  flexScreen: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    height: 50,
  },
  author: {
    fontSize: 16,
  },
  type: {
    fontSize: 16,
  },
  btnView: {
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  save: {
    backgroundColor: '#2196F3',
    width: '40%',
  },
  img: {
    height: 200,
    resizeMode: 'contain',
  },
  waitIMG: {
    height: 200,
    width: '100%',
    margin: 10,
    backgroundColor: COLORS.gainsboro,
  },
  btnImg: {
    height: 200,
    flex: 1,
    marginLeft: 10,
  },
  infoBook: {
    flex: 2,
    margin: 5,
    paddingTop: 10,
    height: 200,
    justifyContent: 'space-between',
  },
  childInfo: {
    paddingHorizontal: 10,
  },
  picker: {
    flexDirection: 'row',
  },
  noResult: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textNoResult: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  viewLike: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginLeft: -15,
  },
});

export default Books;
