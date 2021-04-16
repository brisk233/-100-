package com.yidu.express.serviceXzy;

import com.yidu.express.entity.Orders;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * (Orders)表服务接口
 *
 * @author makejava
 * @since 2021-04-13 16:23:59
 */
@Service
public interface OrdersService {

    /**
     * 通过订单号查询单条数据
     *
     * @param order_number 主键
     * @return 实例对象
     */
    List<Orders> queryById(String order_number);

    /**
     * 通过订单号批量查询数据
     *
     * @param order_numbers 订单号
     * @return 实例对象
     */
    List<Orders> queryByIds(String []order_numbers);

    /**
     * 查询所有订单号
     * @return
     */
    List<Orders> queryAllOrders();

    /**
     * 查询多条数据
     *
     * @param offset 查询起始位置
     * @param limit 查询条数
     * @return 对象列表
     */
    List<Orders> queryAllByLimit(int offset, int limit);

    /**
     * 新增数据
     *
     * @param orders 实例对象
     * @return 实例对象
     */
    Orders insert(Orders orders);

    /**
     * 修改数据
     *
     * @param orders 实例对象
     * @return 实例对象
     */
    Orders update(Orders orders);

    /**
     * 通过主键删除数据
     *
     * @param orderId 主键
     * @return 是否成功
     */
    boolean deleteById(Integer orderId);

}