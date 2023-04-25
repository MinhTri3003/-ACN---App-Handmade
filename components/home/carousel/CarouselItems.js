import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, FlatList, Animated } from 'react-native'
import { color } from 'react-native-elements/dist/helpers'
import { COLORS, SIZES } from '../../../constants'
import TextButton from '../../TextButton'
import CarouselItem from './CarouselItem'


const { width, heigth } = Dimensions.get('window')
let flatList

function infiniteScroll(dataList) {
    const numberOfData = dataList.length
    let scrollValue = 0, scrolled = 0

    setInterval(function () {
        scrolled++
        if (scrolled < numberOfData)
            scrollValue = scrollValue + width

        else {
            scrollValue = 0
            scrolled = 0
        }

        // this.flatList.scrollToOffset({ animated: true, offset: scrollValue })

    }, 5000)
}


const CarouselItems = ({ data }) => {
    const scrollX = new Animated.Value(0)
    let position = Animated.divide(scrollX, width)
    const [dataList, setDataList] = useState(data)

    useEffect(() => {
        setDataList(data)
        infiniteScroll(dataList)
    })


    if (data && data.length) {
        return (
            <View>
                <View
                    style={{
                        // height: 20,
                        // width: 10,
                        alignItems: 'flex-end',
                        marginLeft: 20,

                    }}
                >
                    <TextButton
                        labelStyle={{
                            color: COLORS.darkGray2
                        }}
                        buttonContainerStyle={{
                            backgroundColor: null
                        }}
                        label="Xem thêm..."
                    />
                </View>
                <FlatList data={data}
                    // ref={(flatList) => { this.flatList = 5000 }}
                    keyExtractor={(item, index) => 'key' + index}
                    horizontal
                    pagingEnabled
                    scrollEnabled
                    snapToAlignment="center"
                    scrollEventThrottle={16}
                    decelerationRate={"fast"}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return <CarouselItem item={item} />
                    }}
                    onScroll={
                        Animated.event(
                            [
                                { nativeEvent: { contentOffset: { x: scrollX } } }
                            ],
                            { useNativeDriver: false }
                        )}
                />
            </View>
        )
    }

    // console.log('Please provide Images')
    return null
}


export default CarouselItems