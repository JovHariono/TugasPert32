
import { useContext } from 'react';
import { Appbar } from 'react-native-paper';
import { CONTEXT_APP } from '../../settings';
import useMessage from '../../hooks/useMessage';

const WidgetCommonHeader = ({title, back, action}) => {
  const application = useContext(CONTEXT_APP)
  // TODO: confirm untuk logout
  const message = useMessage()

  return (
    <>
      <Appbar.Header>
        {back}
        <Appbar.Content title={title} />
        { application.isAuthenticated ? (<Appbar.Action icon="account-lock" onPress={() => {
          message.confirmSignOut(() => {
            application.setIsAuthenticated(false);
          })
        }} />) : null}
        {action}
      </Appbar.Header>
    </>
  )
}

export default WidgetCommonHeader;