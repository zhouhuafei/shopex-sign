module.exports = {
    // 加入购物车的接口
    cartAdd: {
        url: 'index.php?ctl=carts&act=add',
        type: 'post',
        data: {
            name: 'product_id',
            num: 'num',
        },
    },
};
