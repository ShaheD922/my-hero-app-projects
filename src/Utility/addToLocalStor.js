const getStoredApp = () => {
  const storedApp = localStorage.getItem("appList");
  if (storedApp) {
    const storedAppData = JSON.parse(storedApp);
    return storedAppData;
  } else {
    return [];
  }
};

const addToStoreDb = (id) => {
  const storedAppData = getStoredApp();
  if (storedAppData.includes(id)) {
    return;
  } else {
    storedAppData.push(id);
    const data = JSON.stringify(storedAppData);
    localStorage.setItem("appList", data);
  }
};

const removeFromStoreDb = (id) => {
  const storedAppData = getStoredApp().map(Number);
  const updateData = storedAppData.filter((appId) => appId !== id);
  const data = JSON.stringify(updateData);
  localStorage.setItem("appList", data);
};

export { getStoredApp, addToStoreDb, removeFromStoreDb };