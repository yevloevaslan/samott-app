export type ApiLogin = {
  data: {
    _id: string;
    updatedAt: Date;
  };
};

export type ApiUserInfo = {
  data: {
    token: string;
    user: {
      phone: string;
      createdAt: Date;
      updatedAt: Date;
      _id: string;
      firstIn: boolean;
    };
  };
};
