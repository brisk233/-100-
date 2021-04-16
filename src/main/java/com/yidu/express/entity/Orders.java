package com.yidu.express.entity;

import org.springframework.stereotype.Component;

import java.io.Serializable;

/**
 * (Orders)实体类
 *
 * @author makejava
 * @since 2021-04-13 16:23:59
 */
@Component
public class Orders implements Serializable {
    private static final long serialVersionUID = 518842808798952038L;
    /**
    * 订单id
    */
    private Integer orderId;
    /**
    * 客户id
    */
    private Integer customerId;
    /**
    * 下单时间
    */
    private String orderTime;
    /**
    * 订单状态
    */
    private Integer orderState;
    /**
    * 订单数量
    */
    private String orderNumber;
    /**
    * 收件人地址id
    */
    private String addressIdDirection;
    /**
    * 寄件人地址id
    */
    private String addressIdSender;
    /**
    * 支付方式
    */
    private Integer payWay;
    /**
    * 订单更新时间
    */
    private String updateTime;


    public Integer getOrderId() {
        return orderId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    public Integer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }

    public String getOrderTime() {
        return orderTime;
    }

    public void setOrderTime(String orderTime) {
        this.orderTime = orderTime;
    }

    public Integer getOrderState() {
        return orderState;
    }

    public void setOrderState(Integer orderState) {
        this.orderState = orderState;
    }

    public String getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(String orderNumber) {
        this.orderNumber = orderNumber;
    }

    public String getAddressIdDirection() {
        return addressIdDirection;
    }

    public void setAddressIdDirection(String addressIdDirection) {
        this.addressIdDirection = addressIdDirection;
    }

    public String getAddressIdSender() {
        return addressIdSender;
    }

    public void setAddressIdSender(String addressIdSender) {
        this.addressIdSender = addressIdSender;
    }

    public Integer getPayWay() {
        return payWay;
    }

    public void setPayWay(Integer payWay) {
        this.payWay = payWay;
    }

    public String getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(String updateTime) {
        this.updateTime = updateTime;
    }

}