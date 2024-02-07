import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Text, View, ScrollView, RefreshControl } from "react-native";
import useHTTP from "../../hooks/useHTTP";
import useJWT from "../../hooks/useJWT";
import useMessage from "../../hooks/useMessage";
import WidgetCommonHeader from "../../widgets/commons/WidgetCommonHeader";
import { Appbar, List } from 'react-native-paper';
import WidgetCommonAuth from "../../widgets/commons/WidgetCommonAuth";
import { BASE_URL } from "../../settings";

const ScreenKasList = ({navigation}) => {
    const [refreshing, setRefreshing] = useState(false);
    const isFocused = useIsFocused();
    const http = useHTTP();
    const jwt = useJWT();
    const message = useMessage();

    const [daftarKas, setDaftarKas] = useState([]);
    const [daftarKasPagination, setDaftarKasPagination] = useState({})

    const onKasList = async (params) => {
      const url = `${BASE_URL}/kas/`;
        const config = {
          headers: {
            Authorization: await jwt.get(),
          },
          params
        }
        http.privateHTTP.get(url, config).then((response) => {
          console.log("uyee", BASE_URL)
          const { results, ...pagination } = response.data;
          
          setDaftarKasPagination(pagination);
          setDaftarKas(results)
        }).catch((error) => {
          console.log(error)
          message.error(error);
        })
        
      }

    const onRefresh = () => {
        onKasList()
        console.log("direfresh....")
      }

    useEffect(() => {
        if (isFocused) {
          onKasList()
        }
        
      }, [isFocused]);

    return ( 
        <>
            <View>
                <WidgetCommonHeader 
                back={(
                    <Appbar.BackAction onPress={navigation.goBack} />
                )}
                title={"Kas"} 
                  action={(
                    <Appbar.Action icon="plus-circle-outline" onPress={() => {
                      navigation.navigate('ScreenKasCreate')
                    }} />
                  )}
                />
                <WidgetCommonAuth child={(
                <ScrollView
                    style={{width: "100%"}}
                    // onScroll={(e) => {console.log(e.contentOffset)}}
                    refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    {daftarKas.map((kas) => (
                    <List.Item
                        key={kas._id}
                        onPress={() => navigation.navigate("ScreenKasDetail", {id: kas._id})}
                        title={kas.nomorTransaksi}
                        left={props => <List.Icon {...props} icon="folder-outline" />}
                    />
                    ))}
                </ScrollView>

                )} />
            </View>
        </>
     );
}
 
export default ScreenKasList;