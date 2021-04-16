package com.yidu.express.serviceXzy.impl;

import com.yidu.express.entity.Orders;
import com.yidu.express.daoXzy.OrdersDao;
import com.yidu.express.serviceXzy.OrdersService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * (Orders)表服务实现类
 *
 * @author makejava
 * @since 2021-04-13 16:23:59
 */
@Service
public class OrdersServiceImpl implements OrdersService {
    @Resource
    private OrdersDao ordersDao;

    /**
     * 通过ID查询单条数据
     *
     * @param order_number 订单号
     * @return 实例对象
     */
    @Override
    public  List<Orders> queryById(String order_number) {
        return this.ordersDao.queryById(order_number);
    }

    /**
     * 批量查询
     * @param order_numbers 订单号
     * @return
     */
    @Override
    public  List<Orders> queryByIds(String[] order_numbers) {
        return this.ordersDao.queryByIds(order_numbers);
    }

    @Override
    public List<Orders> queryAllOrders() {
        return this.ordersDao.queryAllOrders();
    }

    /**
     * 查询多条数据
     *
     * @param offset 查询起始位置
     * @param limit 查询条数
     * @return 对象列表
     */
    @Override
    public List<Orders> queryAllByLimit(int offset, int limit) {
        return this.ordersDao.queryAllByLimit(offset, limit);
    }

    /**
     * 新增数据
     *
     * @param orders 实例对象
     * @return 实例对象
     */
    @Override
    public Orders insert(Orders orders) {
        this.ordersDao.insert(orders);
        return orders;
    }

    @Override
    public Orders update(Orders orders) {
        return null;
    }


    /**
     * 通过主键删除数据
     *
     * @param orderId 主键
     * @return 是否成功
     */
    @Override
    public boolean deleteById(Integer orderId) {
        return this.ordersDao.deleteById(orderId) > 0;
    }
}