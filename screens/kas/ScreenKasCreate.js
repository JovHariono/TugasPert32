import { StyleSheet, View } from 'react-native';
import { Appbar, TextInput, Button } from 'react-native-paper';
import WidgetCommonValidator from '../../widgets/commons/WidgetCommonValidator';
import useMessage from '../../hooks/useMessage';
import useHTTP from '../../hooks/useHTTP';
import useJWT from '../../hooks/useJWT';
import { useState } from 'react';
import useValidator from '../../hooks/useValidator';
import { BASE_URL } from '../../settings';
import WidgetCommonHeader from '../../widgets/commons/WidgetCommonHeader';
import WidgetCommonAuth from '../../widgets/commons/WidgetCommonAuth';

const ScreenKasCreate = ({navigation}) => {
    const jwt = useJWT()
    const http = useHTTP()
    const message = useMessage();

    const [kas, setKas] = useState({
        keterangan: "",
        pemasukan: 0,
        pengeluaran: 0,
        nomorTransaksi: ""
    })
    const kasValidator = useValidator({
        keterangan: [],
        pemasukan: [],
        pengeluaran: [],
        nomorTransaksi: []
    })

    const handleChangeKas = (text, field) => {
        setKas({...kas, [field]: text})
    }

    const onKasCreate = async () => {
        try {
        kasValidator.reset()
        const config = {
            headers: {
            Authorization: await jwt.get(),
            },
        }
        const url = `${BASE_URL}/kas/`
        http.privateHTTP.post(url, kas, config).then((response) => {
            console.log("hello")
            
            message.success(config)
            navigation.goBack();
        }).catch((error) => {
            message.error(error)
            kasValidator.except(error);
            console.log(error);
        })
        } catch (error) {
        console.log(error)
        }
    }

    return ( 
        <>
            <View>
                <WidgetCommonHeader 
                    back={(
                    <Appbar.BackAction onPress={navigation.goBack} />
                    )}
                    title={'Tambah Kas'}
                />
                <WidgetCommonAuth child={(
                    <View style={styles.container}>
                    <View style={styles.wrapperControl}>
                        <TextInput
                        label="Nomor Transaksi"
                        autoCapitalize="none"
                        value={kas.nomorTransaksi}
                        onChangeText={text => handleChangeKas(text, "nomorTransaksi")}
                        />
                        <WidgetCommonValidator messages={kasValidator.get('nomorTransaksi')} />
                    </View>

                    <View style={styles.wrapperControl}>
                        <TextInput
                        label="Keterangan"
                        autoCapitalize="none"
                        value={kas.keterangan}
                        onChangeText={text => handleChangeKas(text, "keterangan")}
                        />
                        <WidgetCommonValidator messages={kasValidator.get('keterangan')} />
                    </View>

                    <View style={styles.wrapperControl}>
                        <TextInput
                        label="Pemasukkan"
                        autoCapitalize="none"
                        value={kas.pemasukan}
                        onChangeText={text => handleChangeKas(text, "pemasukan")}
                        />
                        <WidgetCommonValidator messages={kasValidator.get('pemasukan')} />
                    </View>

                    <View style={styles.wrapperControl}>
                        <TextInput
                        label="Pengeluaran"
                        autoCapitalize="none"
                        value={kas.pengeluaran}
                        onChangeText={text => handleChangeKas(text, "pengeluaran")}
                        />
                        <WidgetCommonValidator messages={kasValidator.get('pengeluaran')} />
                    </View>

                    <View style={styles.wrapperControl}>
                        <Button onPress={onKasCreate} mode="contained">Simpan</Button>
                    </View>
                    </View>
                )} />
            </View>
        </>
     );
}

const styles = StyleSheet.create({
    container: {
      height: "90%",
      width: "100%",
      gap: 32,
      paddingHorizontal: 24,
      marginTop: 20
    },
    wrapperControl: {
      width: "100%"
    }
  })
 
export default ScreenKasCreate;